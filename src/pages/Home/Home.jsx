import { getMoviesTrending } from 'API/moviesAPI';
import { MovieList } from 'components/MoviesList/MoviesList';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Title } from 'components/Title/Title';
import { useEffect, useState } from 'react';

const Home = () => {
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
      <Title>Trending movie</Title>
      <MovieList movies={movies} />
      <ScrollUp />
    </main>
  );
};

export default Home;
