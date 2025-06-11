import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FilmList from "./Component/FilmList";
import FilmDetails from "./Component/FilmDetails";
import ActorDetails from "./Component/ActorDetails";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import "./App.css";

function App() {
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error("error:" + err));
  });
  return (
    <Router>
      <div className="App">
        <AppBar
          position="static"
          sx={{
            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Modern gradient
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              style={{ flexGrow: 1, fontWeight: "bold" }}
            >
              Geek Movies App
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/"
              sx={{
                color: "white",
                fontWeight: "bold",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)", // Hover effect
                  borderRadius: "8px",
                },
              }}
            >
              Home
            </Button>
          </Toolbar>
        </AppBar>
        <Container style={{ marginTop: "16px" }}>
          <Routes>
            <Route path="/" element={<FilmList />} />
            <Route path="/films/:id" element={<FilmDetails />} />
            <Route path="/actor/:actorId" element={<ActorDetails />} />
            {/* <Route path="/add-film" element={<AddFilm/>} />  */}
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
