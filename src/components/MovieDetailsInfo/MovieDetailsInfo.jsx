import movieInfoCSS from './MovieDetailsInfo.module.css';
import propTypes from 'prop-types';

export const MovieDetailsInfo = ({ movieInfo }) => {
  const { url, userScore, releaseYear, title, overview, genresStr } = movieInfo;
  return (
    <div className={movieInfoCSS.movie_info_container}>
      <div className={movieInfoCSS.img_wrap}>
        <img className={movieInfoCSS.movie_img} src={url} alt={title} />
      </div>
      <div className={movieInfoCSS.descrip_wrap}>
        <div className={movieInfoCSS.movie_title_wrap}>
          <p>{title}</p>
          <p>{`(${releaseYear})`}</p>
        </div>
        <div className={movieInfoCSS.score_detail}>
          User Score: <p className={movieInfoCSS.movie_data}>{userScore}</p>
        </div>
        <div className={movieInfoCSS.overview_wrap}>
          <p>Overview</p>
          <p className={movieInfoCSS.movie_data}>{overview}</p>
        </div>
        <div className={movieInfo.genres_wrap}>
          <p>Genres</p>
          <p className={movieInfoCSS.movie_data}>{genresStr}</p>
        </div>
      </div>
    </div>
  );
};

MovieDetailsInfo.propTypes = {
  movieInfo: propTypes.shape().isRequired,
};
