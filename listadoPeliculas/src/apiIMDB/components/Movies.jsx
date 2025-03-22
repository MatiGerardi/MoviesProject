import { useState } from "react";
import PropTypes from "prop-types";
import { addMovie } from "../../apiDB";
import { useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext.jsx";

function ListOfMovies({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
  };

  const { fetchMovies } = useContext(MoviesContext);
  // ? this function has to be async?
  // TODO: search another way to resolve the "problem" of the alert
  const handleAddMovie = async (movie) => {
    try {
      await addMovie(movie);
      alert("Película agregada correctamente 🎬"); // !sino el fetch se hace muy rapido no llega a gregar la nueva pelicula
      fetchMovies();
    } catch (error) {
      /**
       * * Important: this may not show anything nevere because the error is thrown in the API
       */
      console.error("Error agregando película:", error);
    }
  };

  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li
          className="movie"
          key={movie.id}
          onClick={() => handleMovieClick(movie)}
        >
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />

          {/* /**
           * TODO: Make more aesthetic the movie details
           */ }
          {selectedMovie?.id === movie.id && (
            console.log("id1: ", selectedMovie?.id, "id2: ", movie.id),
            <div className="movie-details">
              <p>
                <strong>Género:</strong> {movie.genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.director}
              </p>
              <p>
                <strong>Actores:</strong> {movie.actors}
              </p>
              <p>
                <strong>Sinopsis:</strong> {movie.plot}
              </p>
              <p>
                <strong>Calificación:</strong> {movie.rating}
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="product-star-icon"
                  style={{ width: "15px", height: "15px" }}
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
              </p>
              <p>
                <strong>Duración:</strong> {movie.runtime}
              </p>
              <button onClick={() => handleAddMovie(movie)}>Agregar</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

ListOfMovies.propTypes = {
  movies: PropTypes.array.isRequired,
};

function NoMoviesResults() {
  return <p>No se encontraron películas para esta búsqueda</p>;
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResults />;
}

Movies.propTypes = {
  movies: PropTypes.array, // Permite que movies sea undefined o null, pero debe ser un array si está presente
};

export default Movies;
