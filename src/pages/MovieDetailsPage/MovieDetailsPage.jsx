import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  Outlet,
  Link,
} from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkLocationRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getMovieDetails(movieId);
        setMovie(response);
      } catch (error) {
        setError("Failed to fetch movie details");
      }
    };

    fetchDetails();
  }, [movieId]);

  if (error) return <p className={s.error}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className={s.pageContainer}>
      <button
        type="button"
        onClick={() => navigate(backLinkLocationRef.current)}
        className={s.detailsButton}
      >
        Go back
      </button>
      <div className={s.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={s.moviePoster}
        />
        <h1 className={s.pageTitle}>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p>
          <b>Release Date:</b> {movie.release_date}
        </p>
        <p>
          <b>Rating:</b> {movie.vote_average}
        </p>
      </div>
      <Link to="cast" className={s.detailsLink}>
        Cast
      </Link>
      <Link to="reviews" className={s.detailsLink}>
        Reviews
      </Link>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
