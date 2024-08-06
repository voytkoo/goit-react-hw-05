import { useState, useEffect } from "react";
import { searchMovies } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        setMovies(results);
        setError(null);
      } catch (error) {
        setError("Failed to fetch movies");
      }
    };

    fetchMovies();
  }, [query]);

  const handleInputChange = (e) => {
    setSearchParams({ query: e.target.value });
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term.");
      return;
    }
    setError(null);
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
