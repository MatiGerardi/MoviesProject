import "./App.css";
import ProductList from "./ProductCards/ProductList.jsx";
import Footer from "./Footer1/Footer1.jsx";
import Navbar1 from "./Navbar1/Navbar1.jsx";
import SearchButton from "./SearchButton/SearchButton.jsx";
import { MoviesProvider } from "./context/MoviesProvider.jsx";

function App() {
  return (
    <MoviesProvider>
      <header>
        <Navbar1 />
      </header>

      <main>
        <div className="content">
          <SearchButton />
          <ProductList />
        </div>
      </main>

      <footer id="footer">
        <Footer />
      </footer>
    </MoviesProvider>
  );
}

export default App;
