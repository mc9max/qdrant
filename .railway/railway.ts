import { defineRailway, image, preserve, service, volume } from "railway/iac";

const storageVolume = volume("qdrant-storage", {
  alerts: { usage: { "80": {}, "95": {} } },
  allowOnlineResize: true,
  region: "us-west2",
  sizeMB: 2048,
});

export default defineRailway({
  qdrant: service({
    source: image("qdrant/qdrant:latest"),
    deploy: {
      startCommand: "qdrant",
      healthcheckPath: "/",
    },
    replicas: { "us-west2": 1 },
    volumeMounts: { "/qdrant/storage": storageVolume },
    env: {
      PORT: "6333",
      QDRANT__SERVICE__HTTP_PORT: "6333",
      QDRANT__SERVICE__GRPC_PORT: "6334",
      QDRANT__LOG_LEVEL: "INFO",
    },
  }),
});
