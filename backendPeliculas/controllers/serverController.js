import { MovieModel } from "../models/serverModel.js";

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
    const { id, title, year, poster, genre, director, actors, plot, rating, runtime } = req.body;

    // Validar que se envíen todos los datos requeridos
    if (!id || !title || !year || !poster || !genre || !director || !actors || !plot || !rating || !runtime) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newMovie = await MovieModel.create({ id, title, year, poster, genre, director, actors, plot, rating, runtime });

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};