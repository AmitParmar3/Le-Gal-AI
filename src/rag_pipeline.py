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

# PArsing the PDF