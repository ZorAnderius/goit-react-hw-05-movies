import { getMovieByKeyword, getMoviesPopular } from 'API/moviesAPI';
import { MovieList } from 'components/MoviesList/MoviesList';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const querySearchParam = searchParams.get('query') ?? '';

  const onSearchByKeyword = async query => {
    try {
      const { data } = await getMovieByKeyword(query);
      setMovies(data.results);
    } catch (e) {
      console.log('error', e.message);
    }
  };

  useEffect(() => {
    !querySearchParam && setSearchParams({});
  }, [querySearchParam, setSearchParams]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { data } = await getMoviesPopular();
        setMovies(data.results);
      } catch (e) {
        console.log('error', e.message);
      }
    };

    getMovies();
  }, []);

  return (
    <main>
      <Searchbar
        valueInput={querySearchParam}
        setSearchParams={setSearchParams}
        onSearchByKeyword={onSearchByKeyword}
      />
      <MovieList movies={movies} />
    </main>
  );
};
