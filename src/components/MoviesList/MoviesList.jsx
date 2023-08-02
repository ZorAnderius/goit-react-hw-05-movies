import { Link, useLocation } from 'react-router-dom';
import propTypes from 'prop-types';

import movieCSS from './MoviesList.module.css';
import defaultPoster from '../../images/default_cat.jpeg';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  const movieURL =
    location.pathname === '/'
      ? `${location.pathname}movies`
      : location.pathname;
  return (
    <ul className={movieCSS.gallary}>
      {movies.map(({ id, poster_path, title }) => {
        const url = poster_path ? `${IMG_URL}${poster_path}` : defaultPoster;

        return (
          <li key={id} className={movieCSS.card_container}>
            <Link to={`${movieURL}/${id}`} state={{ from: location }}>
              <div className={movieCSS.modal_img_wrap}>
                <img
                  className={movieCSS.modal_video_img}
                  src={url}
                  alt={title}
                />
              </div>
              <div className={movieCSS.title_wrap}>
                <p className={movieCSS.movie_title}>{title}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MovieList.propTypes = {
  movies: propTypes.arrayOf(propTypes.shape).isRequired,
};
