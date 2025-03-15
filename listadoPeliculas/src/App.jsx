import "./App.css";
import { useState, useEffect } from "react";
import ProductList from "./ProductCards/ProductList.jsx";
import Footer from "./Footer1/Footer1.jsx";
import Navbar1 from "./Navbar1/Navbar1.jsx";
import SearchButton from "./SearchButton/SearchButton.jsx";
import { getMovies } from "./apiBD.js";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header>
        <Navbar1 />
      </header>

      <main>
        <div className="content">
          <SearchButton />
          {/* <Movies onAddMovie={handleAddMovie} /> */}
          <ProductList movies={movies} />
        </div>
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
