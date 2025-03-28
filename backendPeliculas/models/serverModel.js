import pool from "../config/database.js";

export class MovieModel {
  static async getAll() {
    try {
      const [movies] = await pool.query(`
        SELECT 
          BIN_TO_UUID(m.id) AS id,
          m.title,
          m.year,
          m.poster,
          m.director,
          m.actors,
          m.plot,
          m.rating,
          m.runtime,
          GROUP_CONCAT(g.name ORDER BY g.name SEPARATOR ', ') AS genre
        FROM movie m
        LEFT JOIN movie_genres mg ON m.id = mg.movie_id
        LEFT JOIN genre g ON mg.genre_id = g.id
        GROUP BY m.id, m.title, m.year, m.poster, m.director, m.actors, m.plot, m.rating, m.runtime
        ORDER BY m.id DESC;
      `);
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
  
      // Verificar si la película ya existe
      const [existingMovie] = await connection.query(
        "SELECT id FROM movie WHERE title = ?",
        [title]
      );
  
      let movieId;
      if (existingMovie.length > 0) {
        // Si la película ya existe, actualizar sus datos
        movieId = existingMovie[0].id;
  
        await connection.query(
          `UPDATE movie 
           SET year = ?, poster = ?, director = ?, actors = ?, plot = ?, rating = ?, runtime = ?
           WHERE id = ?`,
          [year, poster, director, actors, plot, rating, runtime, movieId]
        );
  
        // Eliminar géneros antiguos antes de insertar los nuevos
        await connection.query("DELETE FROM movie_genres WHERE movie_id = ?", [
          movieId,
        ]);
      } else {
        // Si no existe, insertarla
        const [result] = await connection.query(
          "INSERT INTO movie (id, title, year, poster, director, actors, plot, rating, runtime) VALUES (UUID_TO_BIN(UUID()), ?, ?, ?, ?, ?, ?, ?, ?)",
          [title, year, poster, director, actors, plot, rating, runtime]
        );
  
        // Obtener el ID de la nueva película
        const [movieIdResult] = await connection.query(
          "SELECT id FROM movie WHERE title = ?",
          [title]
        );
        movieId = movieIdResult[0].id;
      }
  
      // Manejar los géneros
      const genres = genre.split(",").map((g) => g.trim());
      for (const g of genres) {
        const [existingGenre] = await connection.query(
          "SELECT id FROM genre WHERE name = ?",
          [g]
        );
        let genreId;
        if (existingGenre.length === 0) {
          // Insertar el nuevo género
          const [genreResult] = await connection.query(
            "INSERT INTO genre (name) VALUES (?)",
            [g]
          );
          genreId = genreResult.insertId;
        } else {
          genreId = existingGenre[0].id;
        }
  
        // Insertar la nueva relación en movie_genres
        await connection.query(
          "INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)",
          [movieId, genreId]
        );
      }
  
      await connection.commit();
      return {
        id: movieId,
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
      console.error("Error creando o actualizando película:", error);
      throw new Error("No se pudo crear o actualizar la película desde el Modelo con la Base de Datos.");
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
