import pool from "../config/database.js";

export class MovieModel {
  static async getAll() {
    try {
      const [movies] = await pool.query("SELECT * FROM movie;");
      return movies;
    } catch (error) {
      console.error("Error obteniendo películas:", error);
      throw new Error("No se pudieron obtener las películas.");
    }
  }

  static async createMovie({ id, title, year, poster, genre, director, actors, plot, rating, runtime }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Verificar si el género ya existe
      const [existingGenre] = await connection.query("SELECT id FROM genre WHERE name = ?", [genre]);
      let genreId;
      if (existingGenre.length === 0) {
        // Insertar el nuevo género
        const [result] = await connection.query("INSERT INTO genre (name) VALUES (?)", [genre]);
        genreId = result.insertId;
      } else {
        genreId = existingGenre[0].id;
      }

      // Insertar la nueva película
      const [result] = await connection.query(
        "INSERT INTO movie (id, title, year, poster, director, actors, plot, rating, runtime) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [id, title, year, poster, director, actors, plot, rating, runtime]
      );

      // Insertar genero-pelicula
      const [movie_genre] = await connection.query(
        "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
        [id, genreId]
      );

      await connection.commit();
      return { id: result.insertId, title, year, poster, genre, director, actors, plot, rating, runtime };
    } catch (error) {
      await connection.rollback();
      console.error("Error creando película:", error);
      throw new Error("No se pudo crear la película en el Modelo.");
    } finally {
      connection.release();
    }
  }
}
