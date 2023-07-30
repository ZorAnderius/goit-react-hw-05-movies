import { Link, useLocation } from 'react-router-dom';

import movieCSS from './MoviesList.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export const MovieList = ({ movies }) => {
  const location = useLocation();
  const movieURL =
    location.pathname === '/'
      ? `${location.pathname}movies`
      : location.pathname;
  return (
    <ul className={movieCSS.gallary}>
      {movies.map(({ id, poster_path, title, overview }) => {
        const url = IMG_URL + poster_path;

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
              <p>{title}</p>
              <p>{overview}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
