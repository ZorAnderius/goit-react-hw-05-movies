import movieInfoCSS from './MovieDetailsInfo.module.css';

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
        <p className={movieInfoCSS.score_detail}>User Score: {userScore}</p>
        <div className={movieInfoCSS.overview_wrap}>
          <p>Overview</p>
          <p>{overview}</p>
        </div>
        <div className={movieInfo.genres_wrap}>
          <p>Genres</p>
          <p>{genresStr}</p>
        </div>
      </div>
    </div>
  );
};
