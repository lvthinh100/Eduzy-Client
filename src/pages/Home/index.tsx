import React from "react";
import { Container, Grid, Paper } from "@mui/material";
import UpcomingEvent from "./UpcomingEvent";
import Schedule from "./Schedule";

const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container>
        <Grid item xs={4}>
          <UpcomingEvent />
        </Grid>
        <Grid item xs={3}>
          Hello World
        </Grid>
        <Grid item xs={5}>
          <Schedule />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
