import axios from 'axios';
const API_KEY = "e64bfb1745e969617af4b805aabbc29f"; 

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrending = async (page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  } catch (error) {
    throw new Error('Failed to fetch genres');
  }
};