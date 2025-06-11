import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";

function FilmList() {
  const [title, setTitle] = useState("");
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFilm = async () => {
    setLoading(true);
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;
      const options = {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM",
        },
      };
      const response = await axios.get(url, options);
      setFilms(response.data.results);
    } catch (error) {
      console.error("Error fetching film", error);
      setFilms([]);
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            background: "rgba(255,255,255,0.95)",
            borderRadius: 3,
            boxShadow: 3,
            p: 4,
            mb: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom color="primary">
            🎬 Movie Search
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              fetchFilm();
            }}
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <TextField
              label="Search Film"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
              sx={{ flex: 1, minWidth: 220 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchFilm}
              type="submit"
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
          </Box>
        </Box>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {films.map((film) => (
              <Grid item xs={12} sm={6} md={4} key={film.id}>
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea component={Link} to={`/films/${film.id}`}>
                    {film.poster_path && (
                      <CardMedia
                        component="img"
                        height="320"
                        image={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={film.title}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" component="div" gutterBottom>
                        {film.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {film.release_date}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                      >
                        {film.overview
                          ? film.overview.slice(0, 90) +
                            (film.overview.length > 90 ? "..." : "")
                          : ""}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default FilmList;
// ...existing code...
