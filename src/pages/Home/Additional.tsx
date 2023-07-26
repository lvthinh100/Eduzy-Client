import {
  Avatar,
  Box,
  Stack,
  Button,
  Typography,
  Paper,
  Badge,
} from "@mui/material";
import React from "react";

import Clock from "../../components/Clock";
import Crown from "../../components/Crown";
import img from "../../assets/avatar.jpg";
import SelectClass from "./SelectClass";
import useResponsive from "../../hooks/useResponsive";

const Additional = () => {
  const isDesktop = useResponsive("up", "md");
  return (
    <Stack direction="column" alignItems="center" sx={{ mt: 2 }}>
      {/* Select */}
      {isDesktop && <SelectClass />}

      {/* Timer */}
      {isDesktop && <Clock />}

      {/* High Record */}
      <Paper
        component={Stack}
        direction="column"
        alignItems="center"
        gap={1}
        sx={{ p: 2 }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            border: (theme) => `3px solid ${theme.palette.prize.first}`,
          }}
        >
          <Badge color="secondary" badgeContent="1st" overlap="circular">
            <Avatar
              src={img}
              sx={{
                border: (theme) => `1px solid ${theme.palette.prize.first}`,
                width: "56px",
                height: "56px",
                m: "4px",
              }}
            />
          </Badge>
        </Box>
        <Typography fontWeight="bold" sx={{ color: "prize.first" }}>
          Hoàng Văn Hòa
        </Typography>
        <Typography fontWeight="bold">#00006</Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Crown quantity={1} variant="first" />
          <Crown quantity={1} variant="second" />
          <Crown quantity={1} variant="third" />
        </Stack>
        <Button variant="gradient">Bảng xếp hạng</Button>
      </Paper>
    </Stack>
  );
};

export default Additional;
