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
            <strong>año: </strong>{movie.year}<br />
            <strong>director: </strong>{movie.director}<br />
            <strong>duracion: </strong>{movie.duration} min
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
              {movie.rate ? movie.rate : "N/A"}
            </span>
          </div>
        </div>
      </div>
  );
}

ProductCard.propTypes = {
  movie: PropTypes.shape({
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    director: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    rate: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }).isRequired
};

export default ProductCard;
