import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../ context/MovieContext';
import { Box, Typography, Chip, Divider, Grid, Paper, Button, CircularProgress, useTheme, useMediaQuery } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import YouTube from 'react-youtube';

const MovieDetails = () => {
  const { id } = useParams();
  const { getMovieDetails, addToFavorites, removeFromFavorites, favorites } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await getMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };
    loadMovie();
  }, [id, getMovieDetails]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box textAlign="center" p={4}>
        <Typography variant="h5">Movie not found</Typography>
      </Box>
    );
  }

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const trailer = movie.videos?.results?.find((vid) => vid.type === 'Trailer');

  // Responsive YouTube player options
  const youtubeOpts = {
    width: '100%',
    height: isMobile ? '200' : '400'
  };

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 4 },
      borderRadius: { xs: 0, sm: 2 },
      boxShadow: { xs: 'none', sm: 3 }
    }}>
      <Grid container spacing={4}>
        {/* Poster Image - Full width on mobile, 1/3 on desktop */}
        <Grid item xs={12} md={4}>
          <Box
            component="img"
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/placeholder.jpg'
            }
            alt={movie.title}
            sx={{ 
              width: '100%',
              borderRadius: 2,
              maxHeight: { xs: '400px', md: 'auto' },
              objectFit: 'contain'
            }}
          />
        </Grid>

        {/* Content - Full width on mobile, 2/3 on desktop */}
        <Grid item xs={12} md={8}>
          {/* Responsive title */}
          <Typography variant={isMobile ? 'h4' : 'h3'} gutterBottom sx={{ fontWeight: 700 }}>
            {movie.title}
          </Typography>

          {/* Rating and runtime row */}
          <Box display="flex" alignItems="center" gap={1} mb={2} flexWrap="wrap">
            <Box display="flex" alignItems="center">
              <StarIcon color="warning" fontSize={isMobile ? 'small' : 'medium'} />
              <Typography variant={isMobile ? 'body1' : 'h6'} sx={{ ml: 0.5 }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                ({movie.vote_count})
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem sx={{ mx: 1, display: { xs: 'none', sm: 'block' } }} />
            <Typography variant={isMobile ? 'body2' : 'body1'}>
              {movie.runtime} min • {new Date(movie.release_date).getFullYear()}
            </Typography>
          </Box>

          {/* Genres - Wrap chips */}
          <Box mb={3} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {movie.genres?.map((genre) => (
              <Chip 
                key={genre.id} 
                label={genre.name} 
                size={isMobile ? 'small' : 'medium'}
              />
            ))}
          </Box>

          {/* Overview text */}
          <Typography variant="body1" paragraph sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem' },
            lineHeight: 1.6
          }}>
            {movie.overview}
          </Typography>

          {/* Favorite button - Full width on mobile */}
          <Button
            variant="contained"
            size={isMobile ? 'large' : 'medium'}
            color={isFavorite ? 'error' : 'primary'}
            onClick={() => isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie)}
            sx={{ 
              mb: 4,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            {isFavorite ? 'Remove from Favorites' : '❤️ Add to Favorites'}
          </Button>

          {/* Trailer section */}
          {trailer && (
            <Box sx={{ mt: 4 }}>
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
                Trailer
              </Typography>
              <Box sx={{ 
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 aspect ratio
                height: 0,
                overflow: 'hidden',
                borderRadius: 2
              }}>
                <YouTube 
                  videoId={trailer.key} 
                  opts={youtubeOpts}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }} 
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetails;