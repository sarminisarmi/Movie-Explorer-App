import { createContext, useState, useEffect, useContext } from 'react';
import {
  fetchTrending,
  searchMovies,
  fetchMovieDetails,
  fetchGenres,
} from '../ services/ api'; 

export const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext); 

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        const [trendingData, genresData] = await Promise.all([
          fetchTrending(),
          fetchGenres(),
        ]);
        setTrending(trendingData);
        setGenres(genresData);

        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const data = await searchMovies(query);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const getMovieDetails = async (id) => {
    try {
      setIsLoading(true);
      const data = await fetchMovieDetails(id);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        trending,
        favorites,
        genres,
        isLoading,
        error,
        handleSearch,
        addToFavorites,
        removeFromFavorites,
        getMovieDetails,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
