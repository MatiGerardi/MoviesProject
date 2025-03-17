import { useState } from "react";
import PropTypes from "prop-types";
import { addMovie } from "../../apiDB";
import { useContext } from 'react';
import { MoviesContext } from '../../context/MoviesContext.jsx';

function ListOfMovies({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
  };

  const { fetchMovies } = useContext(MoviesContext);

  const handleAddMovie = (movie) => {
    try {
      addMovie(movie);
      alert("Película agregada correctamente 🎬");// sino el fetch se hace muy rapido no llega a gregar la nueva pelicula
      fetchMovies();
    } catch (error) {
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
