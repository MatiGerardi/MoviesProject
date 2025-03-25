import PropTypes from "prop-types";
import { addMovie } from "../../apiDB";
import { useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext.jsx";

function ListOfMovies({ movies }) {
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
        <li className="movie" key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.poster} alt={movie.title} />
          <div className="movie-details">
            <p>
              <strong>Genre/s:</strong> {movie.genre}
              <br />
              <strong>Runtime:</strong> {movie.runtime}
              <br />
              <strong>Rating:</strong> {movie.rating}
              <svg
                viewBox="0 -3 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="product-star-icon"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </p>
            <button onClick={() => handleAddMovie(movie)}>Add Movie</button>
          </div>
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
