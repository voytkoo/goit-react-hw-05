import { Link } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => (
  <ul className={s.movieList}>
    {movies.map((movie) => (
      <li key={movie.id} className={s.movieItem}>
        <Link to={`/movies/${movie.id}`} className={s.movieLink}>
          {movie.title}
        </Link>
      </li>
    ))}
  </ul>
);

export default MovieList;
