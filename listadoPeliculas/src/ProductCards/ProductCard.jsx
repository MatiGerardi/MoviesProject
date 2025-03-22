import PropTypes from "prop-types";
import { deleteMovie } from "../apiDB";
import { useContext } from "react";
import { MoviesContext } from "../context/MoviesContext";

function ProductCard({ movie }) {

  const { fetchMovies } = useContext(MoviesContext);
  // ? this function has to be async?
  // TODO: search another way to resolve the "problem" of the alert
  const handleDeleteMovie = async (movie) => {
    if (window.confirm("¿Are you sure about that?")) {
      try {
        await deleteMovie(movie.id);
        alert("Película eliminada correctamente 🎬"); // !sino el fetch se hace muy rapido no llega a gregar la nueva pelicula
        fetchMovies();
      } catch (error) {
        console.error("Error eliminando película:", error);
      }
    }
  };

  function Front() {
    return (
      <div className="product-image">
      <img src={movie.poster} alt={movie.title} className="product-image" />
      </div>
    );
  }

  function Back(){
    return (
      <div className="product-info">
          <p className="product-title">{movie.title}</p>
          <p className="product-description">
            <strong>Año: </strong>
            {movie.year}
            <br />
            <strong>Director: </strong>
            {movie.director}
            <br />
            <strong>Duracion: </strong>
            {movie.runtime}
            {/* <strong>Genero/s</strong>{genre}<br /> */}
          </p>
          <hr className="divider-line" />
          <div className="product-rating">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="product-star-icon"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <span className="product-rating-text">
              {movie.rating ? movie.rating : "N/A"}
            </span>
          </div>
          <div className="product-card-actions">
              <strong>Plot</strong>
              {movie.plot}
              <button onClick={() => handleDeleteMovie(movie)}>Delete Movie</button>
          </div>
        </div>
    )
  }

  return (
    <div className="product-card">
      <div className="product-card-content">
        <Front />
        <Back />
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
