import { getMovieReviewsByMovieId } from 'API/moviesAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import reviewsCSS from './Reviews.module.css';
import { Loader } from 'components/Loader/Loader';

import default_url from '../../images/default_cat.jpeg';

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getReviews = async movieId => {
      setLoading(true);
      try {
        const { data } = await getMovieReviewsByMovieId(movieId);
        if (data) {
          setReviews(data.results);
          setLoading(false);
        } else {
          throw new Error('Unvalid movie');
        }
      } catch (err) {
        setLoading(false);
      }
    };
    getReviews(movieId);
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {reviews?.length ? (
        <ul className={reviewsCSS.reviews_list}>
          {reviews.map(
            ({
              author,
              author_details: { avatar_path, rating, username },
              content,
              created_at,
              id,
            }) => {
              let temp_url;
              if (avatar_path) {
                const firstChar = avatar_path.startsWith('/');
                if (firstChar) {
                  temp_url =
                    avatar_path && avatar_path.slice(1, avatar_path.length);
                } else temp_url = avatar_path;
              }

              const url = temp_url ? temp_url : default_url;

              const newDate = normalizeDate(created_at);

              return (
                <li key={id} className={reviewsCSS.reviews_item}>
                  <div className={reviewsCSS.header_reviews_wrap}>
                    <div className={reviewsCSS.rev_info_wrap}>
                      <div className={reviewsCSS.reviews_img_wrap}>
                        <img
                          className={reviewsCSS.reviews_img}
                          src={url}
                          alt={author}
                        />
                      </div>
                      <div className={reviewsCSS.descr_wrap}>
                        <p className={reviewsCSS.reviews_descr}>
                          Author:
                          <span className={reviewsCSS.reviews_info}>
                            {author}
                          </span>
                        </p>
                        <p className={reviewsCSS.reviews_descr}>
                          Username:
                          <span className={reviewsCSS.reviews_info}>
                            {username}
                          </span>
                        </p>
                        <p className={reviewsCSS.reviews_descr}>
                          Rating:
                          <span className={reviewsCSS.reviews_info}>
                            {rating ? rating : 0}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={reviewsCSS.reviews_descr}>{newDate}</div>
                  </div>
                  <div className={reviewsCSS.reviews}>
                    <p>{content}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul>
      ) : (
        <h1 className={reviewsCSS.no_found}>No reviews found for this movie</h1>
      )}
    </>
  );
};

const normalizeDate = date => {
  const newDate = new Date(date);
  return newDate.toUTCString();
};
