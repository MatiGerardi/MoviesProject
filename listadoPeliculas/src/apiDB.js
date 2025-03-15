import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const getMovies = () => api.get('/movie');
export const createMovie = (data) => api.post('/movie', data);
