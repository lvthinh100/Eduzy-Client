import React from "react";
import dayjs from "dayjs";
import img from "../assets/KeSach2.png";

import { Box, Typography, CardMedia } from "@mui/material";

const Clock = () => {
  const format = "HH:mm:ss";
  const [current, setCurrent] = React.useState(dayjs().format(format));
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(dayjs().format(format));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        sx={{
          height: 200,
          objectFit: "contain",
          width: "fit-content",
          position: "relative",
        }}
        src={img}
      />
      <Typography
        fontSize={28}
        fontWeight="bold"
        color="white"
        sx={{
          position: "absolute",
          top: 95,
          right: 80,
        }}
      >
        {current}
      </Typography>
    </Box>
  );
};

export default Clock;
