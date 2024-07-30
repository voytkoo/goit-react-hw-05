import { Routes, Route, NavLink } from "react-router-dom";
import clsx from "clsx";
import HomePage from "path/to/pages/HomePage";
import MovieDetailsPage from "path/to/pages/MovieDetailsPage";
import MoviesPage from "path/to/pages/MoviesPage";
import NotFoundPage from "path/to/pages/NotFoundPage";
import s from "./App.module.css";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.link, isActive && s.active);
};

export const App = () => {
  return (
    <div className={s.container}>
      <header className={s.header}>
        <nav className={s.nav}>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
          <NavLink to="/movies" className={buildLinkClass}>
            Movies
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};
