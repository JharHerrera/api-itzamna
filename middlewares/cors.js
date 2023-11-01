import cors from 'cors'

export const corsMiddlewares = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:8080",
        "http://localhost:1234",
        "http://localhost:3000",
        "http://127.0.0.1:5500",
        "http://127.0.0.1:5501",
        "http://localhost:3380",
        "http://localhost:9224"
      ];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CROS"));
    },
  });
