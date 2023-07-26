import { Container, Grid } from "@mui/material";
import React from "react";
import ListExams from "./ListExams";
import LeaderBoard from "./LeaderBoard";

const ExamsPage = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <ListExams />
        </Grid>
        <Grid item md={6} xs={12}>
          <LeaderBoard />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ExamsPage;
