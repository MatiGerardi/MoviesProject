import PropTypes from 'prop-types';

function ProductCard({ movie }) {
  return (
      <div className="product-card">
      <img src={movie.poster} alt={movie.title} className="product-image" />
        <div className="product-card-bg"></div>
        <div className="product-card-content">
          <p className="product-title">
            {movie.title}
          </p>
          <p className="product-description">
            <strong>Año: </strong>{movie.year}<br />
            <strong>Director: </strong>{movie.director}<br />
            <strong>Duracion: </strong>{movie.runtime}
            {/* <strong>Genero/s</strong>{genre}<br /> */}
          </p>
          <hr className="divider-line"/>
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
        </div>
      </div>
  );
}

ProductCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actors: PropTypes.string.isRequired,
    plot: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired
};

export default ProductCard;
