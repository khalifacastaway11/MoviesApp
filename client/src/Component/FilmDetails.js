import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link,useNavigate } from 'react-router-dom';
import { Container, Typography, Paper, CircularProgress, Grid, Box, TextField,Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [director, setDirector] = useState('');
  const [actors, setActors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate=useNavigate();
  const handleActorClick=(actorId)=>{
    navigate(`/actor/${actorId}`)
  }

useEffect(() => {
  const fetchFilmDetails = async () => {
    setLoading(true);
    try {
      const [filmResponse, creditsResponse] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
          },
          params: { language: 'en-US' }
        }),
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
          headers: {
            accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
          }
        })
      ]);

      setFilm(filmResponse.data);

      const director = creditsResponse.data.crew.find(member => member.job === 'Director');
      setDirector(director ? director.name : 'N/A');

      const mainActors = creditsResponse.data.cast.slice(0, 5).map(actor => ({
        id:actor.id,
        actorName:actor.name
      }));
      setActors(mainActors);
    } catch (error) {
      console.error('Error fetching film or credits', error);
      setFilm(null);
      setDirector('N/A');
      setActors([]);
    }
    setLoading(false);
  };

  fetchFilmDetails();
}, [id]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  if (!film) return <CircularProgress />;

  

  
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
    
  if(!film){

    return(
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'
        }}
      >
         <Typography variant="h6"  color="white">Film not found</Typography> 
      </Box>
    )
  } 
    const posterUrl=film.poster_path?`https://image.tmdb.org/t/p/w500${film.poster_path}`
    :'https://via.placeholder.com/400x600?text=No+Image';

    
    // Filter actors based on search term
  const filteredActors = actors.filter(actor =>
    actor.actorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return(
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        py: 6
      }}
      >
        <Container maxWidth="md">
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            component={Link}
            to="/"
            sx={{ mb: 3, color: 'white', borderColor: 'white','&:hover':
              { borderColor: 'primary.main', background: 'rgba(255, 255, 255, 0.1)' }}}
          >
            Back to Home Page
          </Button>
          <Typography variant="h4" component="h1" gutterBottom align="center"  color="white">
            {film.title}
          </Typography>
          <Paper elevation={6} sx={{ p: {xs:2,md:4}, borderRadius:4, background: 'rgba(255, 255, 255, 0.97)' }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box  sx={{ textAlign:'center'}}>
                     <img
                       src={posterUrl}
                       alt={film.title}
                       style={{width:"100%",maxWidth:320,height:'auto',borderRadius:'12px', boxShadow:'0 4px 24px rgba(30,60,114,0.115)'}}
                       />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant='h6' component='h2' gutterBottom>
                   Director: <span style={{ fontWeight: 400 }}>{director}</span>
                </Typography>
                <Typography variant='body1' component='p' gutterBottom>
                   <strong>Year:</strong> {film.release_date}
                </Typography>
                <Box sx={{mb:2 }}>
                   <strong>Genres:</strong>{' '}
                   {film.genres.map(genre=>(
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      sc={{mr:1,mb:1}}
                      color="primary"
                      variant="outlined"
                      />
                   ))}
                   </Box>
                   <TextField
                      label="Saerch Actors"
                      variant="outlined"
                      fullWidth
                      value={searchTerm}
                      onChange={handleSearchChange}
                      sx={{mb:2}}
                      />
                    <Typography variant="body1" component="p" sx={{ mb: 1 }}>
  <strong>Main Actors:</strong>{' '}
  {filteredActors.length > 0 ? (
    filteredActors.map((actor, index) => (
      <Chip
        key={index}
        label={actor.actorName}
        onClick={() => handleActorClick(actors[index].id)} // Redirect to actor details
        sx={{ mr: 1, mb: 1, cursor: 'pointer' }}
        color="primary"
        variant="outlined"
      />
    ))
  ) : (
    'No results found'
  )}
</Typography>
              <Typography variant="body1" component="p">
                <strong>Overview:</strong> {film.overview}
              </Typography>
            </Grid>   
           </Grid>
                       
            </Paper>
      </Container>
    </Box>
  );
}


export default FilmDetail;
