import {API_KEY, API_URL} from '../constants';

export const fetchMovies = async (search: string) => {
  try {
    const response = await fetch(
      `${API_URL}/?apikey=${API_KEY}&type=movie&y=2022&&s=${search}`,
    );
    const {Response, Search: data} = await response.json();
    if (Response !== 'True') {
      return [];
    }

    const result = data.map((movie: any) => ({
      id: movie.imdbID,
      poster: movie.Poster,
      title: movie.Title,
      year: movie.Year,
      type: movie.Type,
    }));

    return result;
  } catch (error) {
    console.error(error);
  }
};
