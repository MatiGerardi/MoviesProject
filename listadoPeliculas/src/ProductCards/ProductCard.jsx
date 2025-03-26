import PropTypes from "prop-types";
import "./ProductCard.css";

function ProductCard({ movie, onButtonClick, buttonText }) {

  return (
    <div className="product-card">
      <div className="product-card-content">
        <div className="product-image">
        <div className="product-image">
          <img src={movie.poster} alt={movie.title} className="product-image" />
        </div>
        <div className="product-info">
          <p className="product-title">{movie.title}</p>
          <p className="product-description">
            <strong>Year: </strong>
            {movie.year}
            <br />
            <strong>Director: </strong>
            {movie.director}
            <br />
            <strong>Runtime: </strong>
            {movie.runtime}
            <br />
            <strong>Genre/s: </strong>
            {movie.genre}
            <br />
          </p>
          <hr className="divider-line" />
          <div className="product-rating">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="product-star-icon">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="product-star-icon">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
            </svg>
            <span className="product-rating-text">{movie.rating ? movie.rating : "N/A"}</span>
            <span className="product-rating-text">{movie.rating ? movie.rating : "N/A"}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p>Hover for more ...</p>
          </div>
        </div>


        <div className="product-card-actions">
          <div className="product-description">
            <strong>Plot</strong>
            <br />
            {movie.plot}
          </div>
          {onButtonClick && buttonText && (
            <button onClick={onButtonClick ? () => onButtonClick(movie) : undefined}>
              {buttonText ? buttonText : "Undifined"}
            </button>
            )}
          {onButtonClick && buttonText && (
            <button onClick={onButtonClick ? () => onButtonClick(movie) : undefined}>
              {buttonText ? buttonText : "Undifined"}
            </button>
            )}
        </div>
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
    genre: PropTypes.string.isRequired,
  }).isRequired,
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  onButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
};

export default ProductCard;
