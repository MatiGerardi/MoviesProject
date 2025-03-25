import ProductCard from './ProductCard.jsx';
import './ProductList.css';
import { useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext.jsx';

const ProductList = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <>
      <div className="product-list">
        {movies.length === 0 ? (
        <p>No hay películas disponibles</p>
      ) : (
        movies.map((movie) => (
          // <ProductCard key={`${movie.title}-${movie.year}`} movie={movie} />
          <ProductCard key={movie.id} movie={movie} />
        ))
      )}
      </div>
    </>
  );
};

export default ProductList;
