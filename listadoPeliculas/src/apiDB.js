import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getMovies = () => api.get('/movies');
export const addMovie = async (movie) => { api.post('/movies', movie); };
export const deleteMovie = async (id) => { api.delete(`/movies/${id}`); };