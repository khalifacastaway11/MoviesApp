import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress, Grid, Box, TextField } from '@mui/material';

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
          },
          params: {
            language: 'en-US'
          }
        });
        setFilm(response.data);

        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
          }
        });

        const director = creditsResponse.data.crew.find(member => member.job === 'Director');
        setDirector(director ? director.name : 'N/A');

        const mainActors = creditsResponse.data.cast.slice(0, 5).map(actor => actor.name);  // Get top 5 actors
        setActors(mainActors);

      } catch (error) {
        console.error('Error fetching film or credits', error);
        setFilm(null); 
        setDirector('N/A'); 
        setActors([]);
      }
    };

    fetchFilmDetails();
  }, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (!film) return <CircularProgress />;

  const posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;

  // Filter actors based on search term
  const filteredActors = actors.filter(actor =>
    actor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">{film.title}</Typography>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <img src={posterUrl} alt={film.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" component="h2" gutterBottom>Director: {director}</Typography>
            <Typography variant="body1" component="p" gutterBottom><strong>Year:</strong> {film.release_date}</Typography>
            <Typography variant="body1" component="p" gutterBottom><strong>Genre:</strong> {film.genres.map(genre => genre.name).join(', ')}</Typography>
            <TextField
              label="Search Actors"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
            />
            <Typography variant="body1" component="p"><strong>Main Actors:</strong> {filteredActors.length > 0 ? filteredActors.join(', ') : 'No results found'}</Typography>
            <Typography variant="body1" component="p"><strong>Overview:</strong> {film.overview}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default FilmDetail;
