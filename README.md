# Qdrant Lite — Vector Database

High-performance vector database for AI applications. Store, search, and manage embeddings at scale with a single Rust binary.

## Deploy and Host

Host your own Qdrant instance on Railway. This template provisions the Qdrant vector database with persistent storage for embeddings and metadata.

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/QDRANT_LITE)

## Why Deploy

Qdrant is the open-source vector database powering semantic search, recommendation systems, and RAG pipelines. Running it on Railway gives you a durable, auto-updating, globally reachable instance with:

- **Persistent embeddings** — vector data survives restarts on a Railway volume
- **REST + gRPC APIs** — integrate with any language or framework
- **Single binary** — no external dependencies, fast startup
- **Tunable memory** — scale RAM from 512MB to 1.5GB based on your dataset size
- **Production-ready** — used by enterprises for billion-scale vector search

## Common Use Cases

- **Semantic search** — build search engines that understand meaning, not just keywords
- **RAG pipelines** — power retrieval-augmented generation with your own embeddings
- **Recommendation systems** — find similar products, content, or users
- **AI agents** — give your LLM agents long-term memory via vector storage
- **Image search** — index and search images by visual similarity

### Deployment Dependencies

The deploy form pre-fills all required variables. No additional services needed — Qdrant runs as a single container with a volume for persistent storage.

**After the first successful deploy:**

1. Open `https://<your-domain>/dashboard` to verify the server is running
2. Test the API: `curl https://<your-domain>/collections`

## About Hosting

Qdrant runs as a single container on Railway. Vector data persists on a Railway volume at `/qdrant/storage`. The server listens on port 6333 (REST API) and 6334 (gRPC API).

## Features

- **Vector search** — cosine, dot product, and Euclidean distance metrics
- **Payload filtering** — attach metadata to vectors and filter by any field
- **REST + gRPC APIs** — client libraries for Python, JavaScript, Rust, Go, and more
- **Quantization** — reduce memory usage with scalar or product quantization
- **Hybrid search** — combine dense and sparse vectors for best results
- **Distributed mode** — scale horizontally with clustering (self-managed)
- **Single binary** — no external dependencies, minimal resource footprint

## Dependencies for

- **No external services required** — Qdrant runs standalone
- **Optional: Redis companion** — for distributed caching across multiple instances

## Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | REST API port. Railway maps this to the public domain. | `6333` |
| `QDRANT__STORAGE__STORAGE_PATH` | Path to store vector data on the volume. | `/qdrant/storage` |
| `QDRANT__STORAGE__SNAPSHOT_PATH` | Path to store snapshots. | `/qdrant/storage/snapshots` |
| `QDRANT__SERVICE__HOST` | Bind address for the Qdrant server. | `0.0.0.0` |
| `QDRANT__SERVICE__HTTP_PORT` | REST API port. | `6333` |
| `QDRANT__SERVICE__GRPC_PORT` | gRPC API port. | `6334` |
| `QDRANT__LOG_LEVEL` | Logging level. Options: TRACE, DEBUG, INFO, WARN, ERROR. | `INFO` |

## Quick Start

After deployment, the Qdrant server is ready at your Railway public domain:

```bash
# Check server health
curl https://your-domain.up.railway.app/

# List collections
curl https://your-domain.up.railway.app/collections

# Create a collection
curl -X PUT https://your-domain.up.railway.app/collections/my_collection \
  -H 'Content-Type: application/json' \
  -d '{"vectors": {"size": 384, "distance": "Cosine"}}'

# Insert a point
curl -X PUT https://your-domain.up.railway.app/collections/my_collection/points \
  -H 'Content-Type: application/json' \
  -d '{"points": [{"id": 1, "vector": [0.1, 0.2, ...], "payload": {"text": "hello"}}]}'

# Search
curl -X POST https://your-domain.up.railway.app/collections/my_collection/points/search \
  -H 'Content-Type: application/json' \
  -d '{"vector": [0.1, 0.2, ...], "limit": 10}'
```

## License

Qdrant is licensed under the Apache License 2.0. See the [Qdrant GitHub repository](https://github.com/qdrant/qdrant) for details.
