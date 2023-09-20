import { Box, Container, Grid } from "@mui/material";
import React from "react";
import ListExams from "./ListExams";
import LeaderBoard from "../../components/LeaderBoard";
import { LBEnum } from "../../model/Standard";

const ExamsPage = () => {
  return (
    <Container maxWidth="xl">
      <ListExams />
    </Container>
  );
};

export default ExamsPage;
