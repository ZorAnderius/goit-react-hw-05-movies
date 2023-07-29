import { Home } from 'pages/Home';
import { MovieDetails } from 'pages/MovieDetails';
import { Movies } from 'pages/Movies';
import { Link, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <nav className="">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:movieId" element={<MovieDetails />}>
          <Route path="/movies/:movieId/cast" element={<div>Cast</div>} />
          <Route path="/movies/:movieId/reviews" element={<div>Reviews</div>} />
        </Route>
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </div>
  );
};
