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
    console.log("Data2:", req.body); 
    const { id, title, year, poster, genre, director, actors, plot, rating, runtime } = req.body;
    
    // Validar que se envíen todos los datos requeridos
    if (!id || !title || !year || !poster || !genre || !director || !actors || !plot || !rating || !runtime) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }
    
    const newMovie = await MovieModel.createMovie({ id, title, year, poster, genre, director, actors, plot, rating, runtime });

    // res.status(201).json(newMovie);
    res.status(201).json({ message: "Película agregada exitosamente", movie: newMovie });
    
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};