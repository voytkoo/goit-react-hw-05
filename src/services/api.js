import axios from "axios";

const API_KEY = "0f7ee548641352f1d55167045c3a7ed5";
const API_BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjdlZTU0ODY0MTM1MmYxZDU1MTY3MDQ1YzNhN2VkNSIsIm5iZiI6MTcyMjc3MTM0My43ODk4ODcsInN1YiI6IjY2YTY3MmMxNGVlNjY4ZTI2ZjhkOTY3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VG1zDXVr3-TSd0J8oIm_t_sTuMYHxNU0Sw62lmHXvck`,
  },
});

export const getTrendingMovies = async () => {
  const { data } = await api.get("/trending/movie/day");
  return data.results;
};

export const searchMovies = async (query) => {
  const { data } = await api.get("/search/movie", {
    params: { query, include_adult: false },
  });
  return data.results;
};

export const getMovieDetails = async (id) => {
  const { data } = await api.get(`/movie/${id}`);
  return data;
};

export const getMovieCredits = async (id) => {
  const { data } = await api.get(`/movie/${id}/credits`);
  return data;
};

export const getMovieReviews = async (id) => {
  const { data } = await api.get(`/movie/${id}/reviews`);
  return data;
};
