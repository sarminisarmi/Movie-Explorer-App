import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Chip, useTheme, useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieCard = ({ movie }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useMovieContext();
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ 
      width: { xs: '100%', sm: 300, md: 345 }, // Responsive width
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows[2],
      borderRadius: '12px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.shadows[6]
      },
      position: 'relative'
    }}>
      {/* Favorite Badge */}
      <Chip
        icon={isFavorite ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
        label={isFavorite ? 'Saved' : 'Save'}
        size="small"
        onClick={(e) => {
          e.preventDefault();
          isFavorite ? removeFromFavorites(movie.id) : addToFavorites(movie);
        }}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1,
          backgroundColor: isFavorite ? theme.palette.error.light : 'rgba(0,0,0,0.6)',
          color: 'white',
          '&:hover': {
            backgroundColor: isFavorite ? theme.palette.error.main : 'rgba(0,0,0,0.8)'
          }
        }}
      />

      <CardMedia
        component="img"
        sx={{ 
          height: { xs: 280, sm: 220, md: 200 },
          objectFit: 'cover',
          aspectRatio: '2/3'
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.png'
        }
        alt={movie.title}
        loading="lazy"
      />
      
      <CardContent sx={{ 
        flexGrow: 1,
        p: { xs: 1.5, sm: 2 },
        pb: { xs: 0, sm: 0 }
      }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            fontWeight: 600,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '3.2em'
          }}
        >
          {movie.title}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 1
        }}>
          <StarIcon fontSize={isMobile ? 'small' : 'medium'} color="warning" />
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {movie.vote_average.toFixed(1)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ({movie.vote_count.toLocaleString()})
          </Typography>
        </Box>
        
        {movie.release_date && (
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ display: 'block' }}
          >
            {new Date(movie.release_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short'
            })}
          </Typography>
        )}
      </CardContent>
      
      <CardActions sx={{ 
        p: { xs: 1.5, sm: 2 },
        pt: 0,
        gap: 1
      }}>
        <Button
          component={Link}
          to={`/movie/${movie.id}`}
          size={isMobile ? 'small' : 'medium'}
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            borderRadius: '8px',
            py: { xs: 0.5, sm: 0.75 }
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;