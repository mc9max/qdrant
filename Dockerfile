FROM qdrant/qdrant:latest

USER root

EXPOSE 6333 6334

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:6333/ || exit 1

RUN mkdir -p /qdrant/storage && chown -R 1000:1000 /qdrant/storage

USER 1000

CMD ["qdrant"]
