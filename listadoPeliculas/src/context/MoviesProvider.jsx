import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MoviesContext } from "./MoviesContext";
import { getMovies } from "../apiDB.js";

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.data);
    } catch (error) {
      console.error("Error obteniendo películas:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, fetchMovies }}>
      {children}
    </MoviesContext.Provider>
  );
};

MoviesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
