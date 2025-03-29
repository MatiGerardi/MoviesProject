import PropTypes from "prop-types";
import ProductCard from "../../ProductCards/ProductCard.jsx";
import "./Movies.css";
import { addMovie } from "../../apiDB";
import { useContext } from "react";
import { MoviesContext } from "../../context/MoviesContext.jsx";

function ListOfMovies({ movies }) {

  const { fetchMovies } = useContext(MoviesContext);
  const handleAddMovie = async (movie) => {
    try {
      await addMovie(movie);
      alert("Película agregada correctamente 🎬"); // !sino el fetch se hace muy rapido no llega a gregar la nueva pelicula, o await new Promise((resolve) => setTimeout(resolve, 500)); 
      fetchMovies();
    } catch (error) {
      /**
       * * Important: this may not show anything never(?) because the error is thrown in the API
       */
      console.error("Error agregando película:", error);
    }
  };

  return (
    <ul className="movies-api">
      {movies.map((movie) => (
        <ProductCard key={movie.id} movie={movie} onButtonClick={() => handleAddMovie(movie)} buttonText={"Add"} />
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
