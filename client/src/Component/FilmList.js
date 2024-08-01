import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function FilmList() {
  const [title, setTitle] = useState('');
  const [films, setFilms] = useState([]);

  const fetchFilm = async () => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
        }
      };
      

      const response = await axios.get(url, options);
      setFilms(response.data.results);
    } catch (error) {
      console.error('Error fetching film', error);
      setFilms([]);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>Films</Typography>
      <TextField
        label="Search Film "
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={fetchFilm}>Search</Button>
      <Paper elevation={3} style={{ marginTop: '16px' }}>
        <List>
          {films.map(film => (
            <ListItem button component={Link} to={`/films/${film.id}`} key={film.id}>
              <ListItemText primary={film.title} secondary={`${film.release_date}`} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}

export default FilmList;
