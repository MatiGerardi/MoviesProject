const API_KEY = '4287ad07';

export const searchMovies = async ({ search }) => {
  if (search === '') return null;

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`);
    const json = await response.json();

    const movies = json.Search;

    if (!movies) return [];

    // Obtener detalles adicionales para cada película
    const moviesWithDetails = await Promise.all(
      movies.map(async (movie) => {
        const detailsResponse = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`);
        const details = await detailsResponse.json();

        return {
          id: details.imdbID,
          title: details.Title,
          year: details.Year,
          poster: details.Poster,
          genre: details.Genre,
          director: details.Director,
          actors: details.Actors,
          plot: details.Plot,
          rating: details.imdbRating,
          runtime: details.Runtime
        };
      })
    );

    return moviesWithDetails;
  } catch {
    throw new Error('Error searching movies');
  }
};
