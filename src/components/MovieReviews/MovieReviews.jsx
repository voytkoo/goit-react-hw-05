import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  return (
    <ul className={s.movieReviews}>
      {reviews.map((review) => (
        <li key={review.id} className={s.reviewItem}>
          <p className={s.reviewAuthor}>Author: {review.author}</p>
          <p className={s.reviewContent}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
