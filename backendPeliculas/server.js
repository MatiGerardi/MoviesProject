import express from "express";
import cors from "cors"; //npm
import dotenv from "dotenv";
import movieRouter from "./routes/serverRoutes.js";

dotenv.config();

const app = express();
app.disable("x-powered-by"); // Ocultar tecnología del servidor en caso de bugs

// Middleware
app.use(cors()); //npm
app.use(express.json());

// Rutas
app.use("/movies", movieRouter);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
