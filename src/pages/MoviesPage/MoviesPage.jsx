import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const queryFromParams = searchParams.get("query");
      if (!queryFromParams) return;
      try {
        const results = await searchMovies(queryFromParams);
        setMovies(results);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [searchParams]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term.");
      setMovies([]);
      return;
    }
    setError(null);
    setSearchParams({ query });
  };

  return (
    <div className={s.moviesPage}>
      <form onSubmit={handleSearch} className={s.searchForm}>
        <input
          type="text"
          name="query"
          className={s.searchInput}
          value={query}
          onChange={handleInputChange}
          placeholder="Search movies"
        />
        <button type="submit" className={s.searchButton}>
          Search
        </button>
      </form>
      {error && <p className={s.error}>{error}</p>}
      {movies.length > 0 && !error ? <MovieList movies={movies} /> : null}
    </div>
  );
};

export default MoviesPage;
