import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getMovies = () => api.get('/movies');
export const addMovie = async (movie) => {
    api.post('/movies', movie);
}