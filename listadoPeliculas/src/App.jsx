import "./App.css";
import ProductList from "./ProductCards/ProductList.jsx";
import Footer from "./Footer1/Footer1.jsx";
import Navbar1 from "./Navbar1/Navbar1.jsx";
import ModalButton from "./ModalButton/ModalButton.jsx";
import { MoviesProvider } from "./context/MoviesProvider.jsx";
import SearchWindow from "./apiIMDB/SearchWindow";
import NewForm from "./NewForm/NewForm.jsx";

function App() {
  return (
    <MoviesProvider>
      <header>
        <Navbar1 />
      </header>

      <main>
        <div className="content">
          <div className="actrion-buttons">
          <ModalButton buttonText={"Search"}>
            <SearchWindow></SearchWindow>
          </ModalButton>
          <ModalButton buttonText={"New Movie"}>
            <NewForm></NewForm>
          </ModalButton>
          </div>
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
