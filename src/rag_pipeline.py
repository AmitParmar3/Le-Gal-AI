import os
import hashlib
import time
from typing import List, Dict, Any, Tuple
import pypdf   

from qdrant_client import QdrantClient
from qdrant_cient.models import VectorParams, Distance, PointStruct
from langchain_text_splitter import RecursiveCharacterTextSplitter

from src.config import (
    OPENAI_API_KEY,
    QDRANT_URL,
    QDRANT_COLLECTION,
    DEFAULT_PARENT_CHUNK_SIZE,
    DEFAULT_PARENT_CHUNK_OVERLAP,
    DEFAULT_CHILD_CHUNK_SIZE,
    DEFAULT_CHILD_CHUNK_OVERLAP,
    DEFAULT_TOP_K,
)

# PArsing the PDF native contract file page by page using pypdf and returning a list of page dictionaries with page numbers and raw text.

def parse_pdf(file_path: str) -> List[Dict[str, Any]]:
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Contract file not found at: {file_path}")
    reader = pypdf.PdfReader(file_path)
    pages_content = []
    for index, page in enumerate(reader.pages):
        page_text = page.extract_text() or ""
        if page_text.strip():
            pages_content.append({
                "page": index + 1,
                "text": page_text
            })
    return pages_content

# parent-child chunking(langchains)
def parent_child_chunking(
    pages_content: List[Dict[str, Any]],
    parent_size: int = DEFAULT_PARENT_CHUNK_SIZE,
    parent_overlap: int = DEFAULT_PARENT_CHUNK_OVERLAP,
    child_size: int = DEFAULT_CHILD_CHUNK_SIZE,
    child_overlap: int = DEFAULT_CHILD_CHUNK_OVERLAP
) -> List[Dict[str, Any]]:
    """
    Implements Parent-Child chunking pattern:
    - 2,000-character contextual parent blocks
    - 400-character child search vectors linked to parent block IDs
    """
    parent_splitter = RecursiveCharacterTextSplitter(
        chunk_size=parent_size,
        chunk_overlap=parent_overlap,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    child_splitter = RecursiveCharacterTextSplitter(
        chunk_size=child_size,
        chunk_overlap=child_overlap,
        separators=["\n\n", "\n", ". ", " ", ""]
    )
    chunks = []
    parent_counter = 0

    for page_info in pages_content:
        page_num = page_info["page"]
        parent_texts = parent_splitter.split_text(page_info["text"])
        for parent_text in parent_texts:
            parent_counter += 1
            parent_id = f"parent_{parent_counter}_p{page_num}"
            child_texts = child_splitter.split_text(parent_text)
            for child_idx, child_text in enumerate(child_texts):
                child_id = f"{parent_id}_child_{child_idx+1}"
                chunks.append({
                    "child_id": child_id,
                    "parent_id": parent_id,
                    "child_text": child_text,
                    "parent_text": parent_text,
                    "page_number": page_num
                })
    return chunks

#local hashing-based fallback embedding engine for offline development and local vector search
class DeterministicFallbackEmbeddings:
    """
    Lightweight 1536-dimensional hash-based fallback embedding engine
    used for offline development and local vector search.
    """
    def __init__(self, dimension: int = 1536):
        self.dimension = dimension

    def _embed_text(self, text: str) -> List[float]:
        vector = [0.0] * self.dimension
        for token in text.lower().split():
            h = int(hashlib.md5(token.encode("utf-8")).hexdigest(), 16)
            vector[h % self.dimension] += 1.0
        magnitude = sum(x * x for x in vector) ** 0.5
        return [x / magnitude for x in vector] if magnitude > 0 else vector

    def embed_documents(self, texts: List[str]) -> List[List[float]]:
        return [self._embed_text(t) for t in texts]

    def embed_query(self, text: str) -> List[float]:
        return self._embed_text(text)

#qdrant vector store management and retrieval
class ContractVectorStore:
    """
    Manages vector storage indexing and Parent-Child retrieval using Qdrant.
    """
    def __init__(
        self,
        collection_name: str = QDRANT_COLLECTION,
        qdrant_url: str = QDRANT_URL,
        vector_size: int = 1536
    ):
        self.collection_name = collection_name
        self.vector_size = vector_size
        try:
            self.client = QdrantClient(url=qdrant_url, timeout=2.0, check_compatibility=False)
            self.client.get_collections()
        except Exception:
            self.client = QdrantClient(":memory:")
        self.embeddings = DeterministicFallbackEmbeddings(dimension=vector_size)
    def index_chunks(self, chunks: List[Dict[str, Any]]) -> int:
        """
        Creates collection and indexes child vectors mapped to parent text payloads.
        """
        try:
            self.client.delete_collection(collection_name=self.collection_name)
        except Exception:
            pass
        self.client.create_collection(
            collection_name=self.collection_name,
            vectors_config=VectorParams(size=self.vector_size, distance=Distance.COSINE)
        )
        if not chunks:
            return 0
        child_texts = [c["child_text"] for c in chunks]
        vectors = self.embeddings.embed_documents(child_texts)
        points = [
            PointStruct(
                id=idx + 1,
                vector=vector,
                payload={
                    "child_id": chunk["child_id"],
                    "parent_id": chunk["parent_id"],
                    "child_text": chunk["child_text"],
                    "parent_text": chunk["parent_text"],
                    "page_number": chunk["page_number"]
                }
            )
            for idx, (chunk, vector) in enumerate(zip(chunks, vectors))
        ]
        self.client.upsert(collection_name=self.collection_name, points=points)
        return len(points)
    def retrieve_parents(
        self,
        query: str,
        top_k: int = DEFAULT_TOP_K
    ) -> Tuple[List[Dict[str, Any]], float]:
        """
        Queries Qdrant child vectors, resolves parent text context blocks,
        and measures vector retrieval latency in milliseconds.
        """
        start_time = time.time()
        query_vector = self.embeddings.embed_query(query)
        response = self.client.query_points(
            collection_name=self.collection_name,
            query=query_vector,
            limit=top_k * 2
        )
        latency_ms = (time.time() - start_time) * 1000.0
        seen_parents = set()
        retrieved_parents = []
        for res in response.points:
            payload = res.payload
            parent_id = payload.get("parent_id")
            if parent_id not in seen_parents:
                seen_parents.add(parent_id)
                retrieved_parents.append({
                    "parent_id": parent_id,
                    "parent_text": payload.get("parent_text"),
                    "page_number": payload.get("page_number"),
                    "score": res.score
                })
                if len(retrieved_parents) >= top_k:
                    break
        return retrieved_parents, latency_ms