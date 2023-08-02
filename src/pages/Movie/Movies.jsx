import { getMovieByKeyword, getMoviesPopular } from 'API/moviesAPI';
import { MovieList } from 'components/MoviesList/MoviesList';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Movies = () => {
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

  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current &&
      querySearchParam &&
      onSearchByKeyword(querySearchParam);
  }, [querySearchParam]);

  useEffect(() => {
    !querySearchParam && setSearchParams({});
  }, [querySearchParam, setSearchParams]);

  const getMovies = useCallback(async () => {
    try {
      const { data } = await getMoviesPopular();
      setMovies(data.results);
    } catch (e) {
      console.log('error', e.message);
    }
  }, [setMovies]);

  useEffect(() => {
    !movies && getMovies();
  }, [getMovies, movies]);

  useEffect(() => {
    !querySearchParam && getMovies();
  }, [getMovies, querySearchParam]);

  const renderFirst = firstRender ?? { current: null }
    ? firstRender
    : { current: null };

  return (
    <main>
      <Searchbar
        firstRender={renderFirst}
        valueInput={querySearchParam}
        setSearchParams={setSearchParams}
        onSearchByKeyword={onSearchByKeyword}
      />
      <MovieList movies={movies} />
      <ScrollUp />
    </main>
  );
};

export default Movies;
