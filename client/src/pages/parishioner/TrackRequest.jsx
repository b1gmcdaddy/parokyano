import React from "react";
import NavParishioner from "../../components/NavParishioner";
import imageHeader from '../../assets/imageHeader.jpg';
import Footer from '../../components/Footer';
import { Typography, Grid, Container, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const TrackRequest = () => {
  return (
    <>
      <NavParishioner />
      <Box
        sx={{
          backgroundImage: `url(${imageHeader})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Information Container 1
                </Typography>
                <Typography variant="body1">
                  This is the first container of information. Add your content here.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                  Information Container 2
                </Typography>
                <Typography variant="body1">
                  This is the second container of information. Add your content here.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default TrackRequest;
