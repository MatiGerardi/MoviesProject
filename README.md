# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
_______________________________________
- TODO: 
working nav, working menu, flip cards with more info, delete movie button, create a movie that no appear in the IMDB api (proximamanete), filters
_______________________________________

FILTER
.get('/movies', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.jason(movies)
})
localhost:5000/movies?genre=Action
_______________________________________
cambiar clave IMDB

.randomUDDI()

ver si el async se agrega la movie antes o en el miestras esta el boton de aceptar 

ver si en el POST al crear se necesitan validaciones de tipos, ver con Zod

boton de DELETE, 1:24:00 (hardcodeado?) video: solucion CORS

si no se usa cors, se hace a mano con config

al insertar un genero nuevo, si la pelica tiene 3 generos se insertan los tres juntos, hay que separarlos