import os
from dotenv import load_dotenv

#environment variables
load_dotenv()

#api keys and urls
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "contract_chunks")

#parent child chunking specs
DEFAULT_PARENT_CHUNK_SIZE = int(os.getenv("PARENT_CHUNK_SIZE", 2000))
DEFAULT_PARENT_CHUNK_OVERLAP = int(os.getenv("PARENT_CHUNK_OVERLAP", 50))
DEFAULT_CHILD_CHUNK_SIZE = int(os.getenv("CHILD_CHUNK_SIZE", 400))
DEFAULT_CHILD_CHUNK_OVERLAP = int(os.getenv("CHILD_CHUNK_OVERLAP", 50))
DEFAULT_TOP_K = int(os.getenv("TOP_K_CHUNKS", 3))

#audit profiles
DEFAULT_AUDIT_PROFILE = "STRICT_ENTERPRISE"
DEFAULT_QUERY_TOPICS = [
    "Uncapped Liability & Indemnification",
    "Data Privacy & GDPR Retention Limits",
    "Termination Penalties & Cure Window",
]

#ragas Quality Gate Thresholds
FAITHFULNESS_THRESHOLD = float(os.getenv("FAITHFULNESS_THRESHOLD", 0.85))
RELEVANCE_THRESHOLD = float(os.getenv("RELEVANCE_THRESHOLD", 0.80))
GROUNDING_THRESHOLD = float(os.getenv("GROUNDING_THRESHOLD", 0.80))
QDRANT_LATENCY_THRESHOLD_MS = float(os.getenv("QDRANT_LATENCY_THRESHOLD_MS", 50.0))