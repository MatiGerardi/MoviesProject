import ProductCard from './ProductCard.jsx';
import './ProductList.css';
import PropTypes from 'prop-types';

const ProductList = ({movies}) => {
  return (
    <>
      <div className="product-list">
        {movies.length === 0 ? (
        <p>No hay películas disponibles</p>
      ) : (
        movies.map((movie) => (
          <ProductCard key={`${movie.title}-${movie.year}`} movie={movie} />
        ))
      )}
      </div>
    </>
  );
};
ProductList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default ProductList;
