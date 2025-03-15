import express from "express";
import { getMovies } from "../controllers/serverController.js";
import { addMovie } from "../controllers/serverController.js";

const router = express.Router();

router.get("/movie", getMovies);// obtener peliculas
router.post("/movie", addMovie);// agregar pelicula

export default router;
