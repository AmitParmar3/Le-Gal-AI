import os
from dotenv import load_dotenv

load_dotenv()

# API Credentials & Vector Store Settings
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "legal_contracts")

# Parent-Child Retrieval Parameters (per tech.md Section 5.1 & 6.1)
DEFAULT_PARENT_CHUNK_SIZE = 2000
DEFAULT_PARENT_CHUNK_OVERLAP = 200
DEFAULT_CHILD_CHUNK_SIZE = 400
DEFAULT_CHILD_CHUNK_OVERLAP = 50
DEFAULT_TOP_K = 3

# Default Policy Audit Topics
DEFAULT_QUERY_TOPICS = [
    "uncapped liability and limitation of liability thresholds",
    "data privacy, retention periods, and GDPR compliance",
    "termination penalties, cure periods, and indemnification"
]

DEFAULT_AUDIT_PROFILE = "STRICT_ENTERPRISE_COMPLIANCE"

# Quality Gate Thresholds (per tech.md Section 8)
FAITHFULNESS_THRESHOLD = float(os.getenv("RAGAS_FAITHFULNESS_THRESHOLD", "0.85"))
RELEVANCE_THRESHOLD = float(os.getenv("RAGAS_RELEVANCE_THRESHOLD", "0.80"))
GROUNDING_THRESHOLD = 0.80
QDRANT_LATENCY_THRESHOLD_MS = 50.0