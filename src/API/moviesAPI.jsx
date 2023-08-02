import axios from 'axios';

// const movies = [
//   { id: 'h-1', name: 'Hoodie 1' },
//   { id: 'h-2', name: 'Hoodie 2' },
//   { id: 'h-3', name: 'Hoodie 3' },
//   { id: 's-1', name: 'Sneakers 1' },
//   { id: 's-2', name: 'Sneakers 2' },
//   { id: 's-3', name: 'Sneakers 3' },
//   { id: 's-4', name: 'Sneakers 4' },
//   { id: 'p-1', name: 'Pants 1' },
//   { id: 'p-2', name: 'Pants 2' },
//   { id: 'p-3', name: 'Pants 3' },
// ];

// export const getMovies = () => {
//   return movies;
// };

// export const getMoviesById = movieId => {
//   return movies.find(movie => movie.id === movieId);
// };

const API_KEY = 'd277c204a2c30c818c2befd49f072a72';
const TRENDING_END_POINT = 'trending/movie/';
const POPULAR_MOVIES = 'movie/popular/';
const MOVIE_END_POINT = 'movie/';
const SEARCH_KEYWORD_END_POINT = 'search/movie';
const CAST_END_POINT = '/credits';
const REVIEWS_END_POINT = '/reviews';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export async function getMoviesTrending(timeWindow = 'week', page = 1) {
  return await axios(`${TRENDING_END_POINT}${timeWindow}?api_key=${API_KEY}`, {
    params: {
      page: page,
    },
  });
}

export async function getMoviesPopular(page = 1) {
  return await axios(`${POPULAR_MOVIES}?api_key=${API_KEY}`, {
    params: {
      page: page,
    },
  });
}

export async function getMovieById(movie_id) {
  return await axios(`${MOVIE_END_POINT}${movie_id}?api_key=${API_KEY}`);
}

export async function getMovieByKeyword(keyword) {
  return await axios(`${SEARCH_KEYWORD_END_POINT}?api_key=${API_KEY}`, {
    params: {
      query: keyword,
      page: 1,
    },
  });
}

export async function getMovieCastByMovieId(movieId) {
  return await axios(
    `${MOVIE_END_POINT}${movieId}${CAST_END_POINT}?api_key=${API_KEY}`
  );
}

export async function getMovieReviewsByMovieId(movieId) {
  return await axios(
    `${MOVIE_END_POINT}${movieId}${REVIEWS_END_POINT}?api_key=${API_KEY}`
  );
}
