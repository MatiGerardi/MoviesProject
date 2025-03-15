import { useState } from "react";
import PropTypes from "prop-types";
import { createMovie } from "../../apiDB";

function ListOfMovies({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
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

          {selectedMovie?.id === movie.id && (
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
              </p>
              <p>
                <strong>Duración:</strong> {movie.runtime}
              </p>
              <button onClick={() => createMovie(movie)}>Agregar</button>
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

export default Movies;
