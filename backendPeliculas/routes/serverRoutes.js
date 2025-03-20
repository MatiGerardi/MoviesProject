import express from "express";
import { getMovies } from "../controllers/serverController.js";
import { addMovie } from "../controllers/serverController.js";
import { deleteMovie } from "../controllers/serverController.js";

const router = express.Router();

router.get('/', getMovies);// obtener peliculas
router.post('/', addMovie);// agregar pelicula
router.delete('/:id', deleteMovie);//eliminar pelicula

export default router;
