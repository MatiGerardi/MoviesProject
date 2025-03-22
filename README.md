# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
_______________________________________
- TODO: 
working nav, working menu, create a movie that no appear in the OMDB api (proximamanete), filters
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

ver la idea de actualizar la base de datos unicamente cuando se cierra
en el miestras solo trabajar con un json
_______________________________________

.randomUDDI()

ver si en el POST al crear se necesitan validaciones de tipos, ver con Zod

si no se usa cors, se hace a mano con config

al insertar un genero nuevo, si la pelicua tiene 3 generos se insertan los tres juntos, hay que separarlos

ver TODO's 