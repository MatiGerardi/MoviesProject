import ProductCard from './ProductCard.jsx';
import './ProductList.css';
import { useContext } from 'react';
import { MoviesContext } from '../context/MoviesContext.jsx';
import { deleteMovie } from '../apiDB';


const ProductList = () => {
  const { movies, fetchMovies } = useContext(MoviesContext);

  const handleDeleteMovie = async (movie) => {
    if (window.confirm("¿Are you sure about that?")) {
      try {
        await deleteMovie(movie.id);
        // alert("Película eliminada correctamente 🎬"); // !sino el fetch se hace muy rapido no llega a gregar la nueva pelicula
      await new Promise((resolve) => setTimeout(resolve, 500)); 
        fetchMovies();
      } catch (error) {
        console.error("Error eliminando película:", error);
      }
    }
  };

  return (
    <>
      <div className="product-list">
        {movies.length === 0 ? (
        <p>No hay películas disponibles</p>
      ) : (
        movies.map((movie) => (
          <ProductCard key={movie.id} movie={movie} onButtonClick={() => handleDeleteMovie(movie)} buttonText={"Delete"}/>
        ))
      )}
      </div>
    </>
  );
};

export default ProductList;
