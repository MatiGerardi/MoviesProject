import { MovieModel } from "../models/serverModel.js";
import { validateMovie } from "../schemas/zodSchema.js";

export const getMovies = async (req, res) => {
  try {
    const movies = await MovieModel.getAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addMovie = async (req, res) => {
  try {
    const result = validateMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const {title, year, poster, genre, director, actors, plot, rating, runtime} = req.body
    
    const newMovie = await MovieModel.createMovie({ title, year, poster, genre, director, actors, plot, rating, runtime });
    return res.status(201).json({ message: "Película agregada exitosamente", movie: newMovie });
  } catch (error) {
    console.error("Error en el Controlador:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Datos Erroneos" });
    }
    const movieDeleted = await MovieModel.deleteMovie({ id });
    if (movieDeleted.affectedRows === 0) {
      return res.status(404).json({ message: "Película no encontrada" });
    }
    return res.status(200).json({ message: "Película eliminada exitosamente" });
  } catch (error) {
    console.error("Error en el Controlador:", error);
    return res.status(500).json({ error: "Error interno del servidor", details: error.message });
  }
}