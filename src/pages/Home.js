import { useEffect, useState } from 'react';
import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
import MovieCard from '../components/MovieCard';
import { useMovieContext } from '../ context/MovieContext';

const Home = () => {
  const { movies, trending, isLoading, error } = useMovieContext();
  const [page, setPage] = useState(1);
  const [displayMovies, setDisplayMovies] = useState([]);

  useEffect(() => {
    if (movies.length > 0) {
      setDisplayMovies(movies);
    } else {
      setDisplayMovies(trending);
    }
  }, [movies, trending]);

  const loadMore = () => {
    setPage(page + 1);
    // Note: In a real app, you would fetch more data here
  };

  if (isLoading && page === 1) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {movies.length > 0 ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <Grid container spacing={3}>
        {displayMovies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
      {displayMovies.length > 0 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="contained" onClick={loadMore} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Home;