import React from "react";
import { Box, Container, Dialog, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import UpcomingEvent from "./UpcomingEvent";
import Schedule from "./Schedule";
import Additional from "./Additional";
import SelectClass from "./SelectClass";
import CalendarContainer from "./CalendarContainer";

const HomePage = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={1}>
        <Grid item md={4} xs={12}>
          <Box
            sx={{
              display: { md: "none", xs: "flex" },
              justifyContent: "space-between",
              m: 1,
            }}
          >
            <SelectClass />
            <IconButton
              aria-label="Lịch"
              sx={{ justifySelf: "flex-end" }}
              onClick={handleOpen}
            >
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
          </Box>
          <UpcomingEvent />
        </Grid>
        <Grid item md={4} xs={12}>
          <Additional />
        </Grid>
        <Grid item md={4} xs={12}>
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            <CalendarContainer>
              <Schedule />
            </CalendarContainer>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        sx={{ display: { md: "none", xs: "block" } }}
        onClose={handleClose}
      >
        <Schedule />
      </Dialog>
    </Container>
  );
};

export default HomePage;
