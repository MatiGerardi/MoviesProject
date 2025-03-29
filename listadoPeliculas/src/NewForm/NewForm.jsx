import { useState, useContext } from "react";
import "./NewForm.css";
import { addMovie } from "../apiDB";
import { MoviesContext } from "../context/MoviesContext.jsx";

function NewForm() {
  const { fetchMovies } = useContext(MoviesContext);

  // Estado para el título y el plot
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  // Manejo de cambios en los inputs
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handlePlotChange = (e) => setYear(e.target.value);

  // Crear película con datos genéricos
  const handleAddMovie = async () => {
    const newMovie = {
      title,
      year,
      poster: "https://fakeimg.pl/400x600?text=Coming+soon&font=bebas&font_size=64",
      genre: "-",
      director: "-",
      actors: "-",
      plot: "-",
      rating: "0.0",
      runtime: "-",
    };

    try {
      await addMovie(newMovie);
      alert("Película agregada correctamente 🎬");
      fetchMovies();
      setTitle(""); // Limpiar el campo después de agregar
      setYear("");
    } catch (error) {
      console.error("Error agregando película:", error);
    }
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal__header">
          <span className="modal__title">New Movie</span>
        </div>
        <div className="modal__body">
          <div className="input">
            <label className="input__label">Title</label>
            <input
              className="input__field"
              type="text"
              value={title}
              onChange={handleTitleChange}
            />
            <p className="input__description">
                Important realse information
              </p>
          </div>
          <div className="input">
            <label className="input__label">Release Date / Details</label>
            <textarea
              className="input__field input__field--textarea"
              value={year}
              onChange={handlePlotChange}
            />
            <p className="input__description">
                Important realse information
              </p>
          </div>
        </div>
        <div className="modal__footer">
          <button className="button button--primary" onClick={handleAddMovie}>
            Create Movie
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewForm;
