import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, CircularProgress, Box } from "@mui/material";

function ActorDetails() {
  const { actorId } = useParams();
  const [actor, setActor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActorDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${actorId}`,
          {
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWRkMGU4MGU1YTZkMDhlMTdiNmRlNWYwZjQ4NjYyZCIsIm5iZiI6MTcyMTExOTM3NC4wMDkwNzksInN1YiI6IjY2OTYzMTcxYTJhYmI3NTkzYmZkOTJmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mWWfvqMyrSnIxxGScQ1GAwcrrz2vflZr-J_d8rLxrfM",
            },
          }
        );
        setActor(response.data);
      } catch (error) {
        console.error("error fetching actor details:", error);
      }
      setLoading(false);
    };
    fetchActorDetails();
  }, [actorId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!actor) {
    return (
      <Typography variant="h6" color="error" align="center">
        Actor not found.
      </Typography>
    );
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {actor.name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Biography:</strong>{" "}
        {actor.biography || "No biography available."}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Birthday:</strong> {actor.birthday || "N/A"}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Place of Birth:</strong> {actor.place_of_birth || "N/A"}
      </Typography>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        {actor.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            style={{ width: "100%", maxWidth: 300, borderRadius: 8 }}
          />
        )}
      </Box>
    </Container>
  );
}
export default ActorDetails;
