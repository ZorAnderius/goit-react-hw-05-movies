import { getMovieById } from 'API/moviesAPI';
import { BackButton } from 'components/BackButton/BackButton';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { MovieDetailsInfo } from 'components/MovieDetailsInfo/MovieDetailsInfo';
import { ScrollUp } from 'components/ScrollUp/ScrollUp';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

import movieDetaiilsCSS from './MovieDetails.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  const { movieId } = useParams();

  useEffect(() => {
    const getMovie = async movieId => {
      try {
        const { data } = await getMovieById(movieId);
        if (data) {
          setMovie(data);
        } else {
          throw new Error('Unvalid movie');
        }
      } catch (err) {}
    };
    getMovie(movieId);
  }, [movieId]);
  let movieCust;
  if (movie) {
    movieCust = customizedMovieDetails(movie);
  }

  const location = useLocation();
  const backLink = useRef(location?.state?.from ?? '/movies');

  return (
    <main className={movieDetaiilsCSS.movie_details_container}>
      <BackButton linkTo={backLink.current} />
      {movie && (
        <div>
          <MovieDetailsInfo movieInfo={movieCust} />
          <ul className={movieDetaiilsCSS.btn_wrap}>
            <li>
              <Link to="cast" className={movieDetaiilsCSS.btn_size}>
                <Button>Cast</Button>
              </Link>
            </li>
            <li>
              <Link to="reviews" className={movieDetaiilsCSS.btn_size}>
                <Button>Reviews</Button>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <ScrollUp />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

function customizedMovieDetails(movie) {
  const { poster_path, title, overview, vote_average, release_date, genres } =
    movie;
  const url = IMG_URL + poster_path;
  const userScore = `${getUserScorePerc(vote_average)}%`;
  const releaseYear = getReleaseYear(release_date);
  const genresStr = getGenres(genres);

  return { url, userScore, releaseYear, title, overview, genresStr };
}

function getUserScorePerc(userScore) {
  return Math.round(userScore * 10);
}

function getReleaseYear(release_date) {
  const date = new Date(release_date);
  return date.getFullYear();
}

function getGenres(genres) {
  return genres.map(({ name }) => name).join(' ');
}

export default MovieDetails;
