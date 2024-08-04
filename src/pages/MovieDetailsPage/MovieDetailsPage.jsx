import { useEffect, useState } from "react";
import { useParams, Link, Routes, Route, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return null;

  return (
    <div className={s.pageContainer}>
      <Link to={backLink}>Go back</Link>
      <div className={s.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.moviePoster}
        />
        <div className={s.movieInfo}>
          <h1 className={s.pageTitle}>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>
            <b>Release Date:</b> {movie.release_date}
          </p>
          <p>
            <b>Rating:</b> {movie.vote_average}
          </p>
        </div>
      </div>
      <nav>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </nav>
      <Routes>
        <Route path="cast" element={<MovieCast />} />
        <Route path="reviews" element={<MovieReviews />} />
      </Routes>
    </div>
  );
};

export default MovieDetailsPage;
