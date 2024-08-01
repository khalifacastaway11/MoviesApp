import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FilmList from './Component/FilmList';
import FilmDetails from './Component/FilmDetails';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import './App.css';


function App() {
 


  useEffect(()=>{
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
  })
  return (
    <Router>
        <div classNAme="App">
          <AppBar position='static'>
             <Toolbar>
              <Typography variant="h6" style={{flexGrow:1}}>
                Geek Movies App
              </Typography>
              <Button color="inherit" component={Link} to="/"> Home</Button>
              <Button color="inherit" component={Link} to="/add-film"> Add Film</Button>
             </Toolbar>
          </AppBar>
          <Container style={{ marginTop: '16px' }}>
          <Routes>
            <Route path="/" element={<FilmList/>} />
            <Route path="/films/:id" element={<FilmDetails/>} />
            {/* <Route path="/add-film" element={<AddFilm/>} />  */}
          </Routes>
          </Container>

        </div>
    </Router>
  );
}

export default App;
