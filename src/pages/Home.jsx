import { getMoviesTrending } from 'API/moviesAPI';
import { MovieList } from 'components/MoviesList/MoviesList';
import { useEffect, useState } from 'react';

export const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await getMoviesTrending();
        if (data?.results?.length) {
          setMovies(data.results);
        } else {
          throw new Error('Unvalid movie');
        }
      } catch (e) {
        console.log('error', e.message);
      }
    };

    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending movie</h1>
      <MovieList movies={movies} />
    </main>
  );
};
