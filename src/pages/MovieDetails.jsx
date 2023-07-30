import { getMovieById } from 'API/moviesAPI';
import { MovieDetailsInfo } from 'components/MovieDetailsInfo/MovieDetailsInfo';
import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export const MovieDetails = () => {
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

  return (
    <main>
      {movie && (
        <>
          <MovieDetailsInfo movieInfo={movieCust} />
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </>
      )}
      <Outlet />
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
