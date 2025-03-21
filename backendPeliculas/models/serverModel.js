import pool from "../config/database.js";

export class MovieModel {
  static async getAll() {
    try {
      const [movies] = await pool.query(
        "SELECT BIN_TO_UUID(id) AS id, title, year, poster, director, actors, plot, rating, runtime FROM movie;"
      );
      return movies;
    } catch (error) {
      console.error("Error obteniendo películas:", error);
      throw new Error("No se pudieron obtener las películas.");
    }
  }

  static async createMovie({
    title,
    year,
    poster,
    genre,
    director,
    actors,
    plot,
    rating,
    runtime,
  }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Verificar si el género ya existe
      const [existingGenre] = await connection.query(
        "SELECT id FROM genre WHERE name = ?",
        [genre]
      );
      let genreId;
      if (existingGenre.length === 0) {
        // Insertar el nuevo género
        const [result] = await connection.query(
          "INSERT INTO genre (name) VALUES (?)",
          [genre]
        );
        genreId = result.insertId;
      } else {
        genreId = existingGenre[0].id;
      }

      // Insertar la nueva película
      const [result] = await connection.query(
        "INSERT INTO movie (id, title, year, poster, director, actors, plot, rating, runtime) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?, ?)",
        [title, year, poster, director, actors, plot, rating, runtime]
      );

      // Insertar genero-pelicula
      // Recuperar el id de la película recién insertada
      const [movieIdResult] = await connection.query(
        "SELECT id FROM movie WHERE title = ?",
        [title]
      );
      const movieId = movieIdResult[0].id;
      // Insertar en la tabla
      const [movie_genre] = await connection.query(
        "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
        [movieId, genreId]
      );

      await connection.commit();
      return {
        id: result.insertId,
        title,
        year,
        poster,
        genre,
        director,
        actors,
        plot,
        rating,
        runtime,
      };
    } catch (error) {
      await connection.rollback();
      console.error("Error creando película:", error);
      throw new Error("No se pudo crear la película en el Modelo.");
    } finally {
      connection.release();
    }
  }

  static async deleteMovie({ id }) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      // Verificar si la película existe
      const [existingMovie] = await connection.query(
        "SELECT id FROM movie WHERE id = UUID_TO_BIN(?)",
        [id]
      );
      const movieId = existingMovie[0].id; // ya lo recupero en BIN para luego no tener que hacer la conversion en las proximas

      // Eliminar la película
      const [result] = await connection.query(
        "DELETE FROM movie WHERE id = ?",
        [movieId]
      );

      // Eliminar la relación de género-película
      await connection.query("DELETE FROM movie_genres WHERE movie_id = ?", [
        movieId,
      ]);

      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      console.error("Error eliminando película:", error);
      throw new Error("No se pudo eliminar la película en el Modelo.");
    } finally {
      connection.release();
    }
  }
}
