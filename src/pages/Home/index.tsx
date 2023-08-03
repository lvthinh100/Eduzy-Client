import React from "react";
import { Box, Container, Dialog, Grid, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import UpcomingEvent from "./UpcomingEvent";
import Schedule from "./Schedule";
import Additional from "./Additional";
import CalendarContainerRight from "./CalendarContainerRight";
import SelectClassType from "../../components/SelectClassType";

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
      <Grid container spacing={2}>
        <Grid item lg={0} md={12} xs={12}>
          <Box
            sx={{
              display: { lg: "none", xs: "flex" },
              justifyContent: "space-between",
              my: 1,
            }}
          >
            <SelectClassType />
            <IconButton
              aria-label="Lịch"
              sx={{ justifySelf: "flex-end" }}
              onClick={handleOpen}
            >
              <CalendarMonthIcon fontSize="large" />
            </IconButton>
          </Box>
        </Grid>
        <Grid item lg={4} md={3} xs={12}>
          {/* Mobile Select */}

          <UpcomingEvent />
        </Grid>
        <Grid item lg={4} md={9} xs={12}>
          <Additional />
        </Grid>
        <Grid item lg={4} md={0} xs={0}>
          <Box
            sx={{
              mr: { lg: 0, md: 8, xs: 0 },
            }}
          >
            <CalendarContainerRight>
              <Schedule />
            </CalendarContainerRight>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        maxWidth={"xs"}
        fullWidth={true}
        open={open}
        sx={{ display: { lg: "none", xs: "block" } }}
        onClose={handleClose}
      >
        <Schedule />
      </Dialog>
    </Container>
  );
};

export default HomePage;
