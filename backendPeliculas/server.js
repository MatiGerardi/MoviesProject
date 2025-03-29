import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import movieRouter from "./routes/serverRoutes.js";
import { corsMiddleware } from "./middlewares/corsConfig.js";

dotenv.config();

const app = express();
app.disable("x-powered-by"); // Ocultar tecnología del servidor en caso de bugs

// Configuración de Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 peticiones por IP en ese tiempo
  message: "Demasiadas solicitudes desde esta IP, intenta de nuevo más tarde.",
  standardHeaders: true, // Devuelve info en headers sobre el rate limit
  legacyHeaders: false, // No usa los headers X-RateLimit obsoletos
});

// Middleware
app.use(corsMiddleware());
app.use(express.json());
app.use(limiter); // Aplicar rate limiting globalmente

// Rutas
app.use("/movies", movieRouter);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
