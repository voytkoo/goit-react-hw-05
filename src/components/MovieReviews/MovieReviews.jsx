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

  const uniqueReviews = Array.from(
    new Set(reviews.map((review) => review.id))
  ).map((id) => {
    return reviews.find((review) => review.id === id);
  });

  return (
    <div className={s.reviews}>
      {uniqueReviews.length === 0 ? (
        <p>No reviews available</p>
      ) : (
        <ul>
          {uniqueReviews.map((review) => (
            <li key={review.id} className={s.reviewItem}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
