import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    getMovieCredits(movieId).then((data) => setCast(data.cast));
  }, [movieId]);

  const uniqueCast = Array.from(new Set(cast.map((actor) => actor.id))).map(
    (id) => {
      return cast.find((actor) => actor.id === id);
    }
  );

  return (
    <ul className={s.movieCast}>
      {uniqueCast.map((actor) => (
        <li key={actor.id} className={s.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className={s.castImage}
          />
          <p className={s.castName}>{actor.name}</p>
          <p>Character: {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
