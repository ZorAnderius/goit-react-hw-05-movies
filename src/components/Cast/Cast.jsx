import { getMovieCastByMovieId } from 'API/moviesAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import castCSS from './Cast.module.css';
import { Loader } from 'components/Loader/Loader';
import defaultPoster from '../../images/default_cat.jpeg';

const IMG_URL = 'https://image.tmdb.org/t/p/original';

export const Cast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getCast = async movieId => {
      setLoading(true);
      try {
        const { data } = await getMovieCastByMovieId(movieId);

        if (data) {
          setCasts(data.cast);
          setLoading(false);
        } else {
          throw new Error('Unvalid movie');
        }
      } catch (err) {
        setLoading(false);
      }
    };
    getCast(movieId);
  }, [movieId]);

  return (
    <>
      <ul className={castCSS.cast_list}>
        {casts &&
          casts.map(({ character, name, profile_path, popularity }) => {
            const url = profile_path
              ? `${IMG_URL}${profile_path}`
              : defaultPoster;
            return (
              <li key={`${character}${name} `} className={castCSS.cast_item}>
                <div className={castCSS.cast_img_wrap}>
                  <img className={castCSS.cast_img} src={url} alt={name} />
                </div>
                <div className={castCSS.descr_wrap}>
                  <div className={castCSS.cast_info_wrap}>
                    Name: <p className={castCSS.cast_info}>{name}</p>
                  </div>
                  <div className={castCSS.cast_info_wrap}>
                    Character: <p className={castCSS.cast_info}>{character}</p>
                  </div>
                  <div className={castCSS.cast_info_wrap}>
                    Popularity:
                    <p className={castCSS.cast_info}>{popularity}</p>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      {isLoading && <Loader />}
    </>
  );
};
