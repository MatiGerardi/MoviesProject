import cors from "cors";

const ACCEPTED_ORIGINS = [
  "http://localhost:5000",
  "http://localhost:5173",
];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked request from origin: ${origin}`);
      return callback(null, false); // Rechaza la petición sin lanzar un error
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permite cookies y autenticación con sesiones
  });
