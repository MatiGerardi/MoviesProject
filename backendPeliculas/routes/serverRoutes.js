import express from "express";
import { getMovies } from "../controllers/serverController.js";
import { addMovie } from "../controllers/serverController.js";

const router = express.Router();

router.get("/movies", getMovies);// obtener peliculas
router.post("/movies", addMovie);// agregar pelicula
// router.post("/movies", async (req, res, next) => {
//     try {
//       await addMovie(req, res);
//     } catch (error) {
//       next(error);
//     }
//   });

export default router;
