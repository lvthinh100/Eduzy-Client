import React from "react";
import dayjs from "dayjs";
import img from "../assets/KeSach2.jpg";

import { Box, Typography, CardMedia, Stack } from "@mui/material";

const Clock = () => {
  const format = "HH:mm:ss";
  const [current, setCurrent] = React.useState(dayjs().format(format));
  // React.useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrent(dayjs().format(format));
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, []);
  const startUpdatingClock = () => {
    const timer = setInterval(() => {
      setCurrent(dayjs().format(format));
    }, 1000);
    return timer;
  };

  React.useEffect(() => {
    const now = dayjs();
    const timeUntilNextSecond = 1000 - now.millisecond();

    const timeout = setTimeout(() => {
      const timer = startUpdatingClock();
      return () => {
        clearInterval(timer);
      };
    }, timeUntilNextSecond);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        sx={{
          height: 130,
          objectFit: "contain",
          width: "fit-content",
          position: "relative",
        }}
        src={img}
      />
      <Stack
        direction="row"
        fontWeight="bold"
        color="white"
        sx={{
          position: "absolute",
          top: 58,
          right: 48,
        }}
      >
        {current.split("").map((text, i) => (
          <Box
            sx={{
              position: "relative",
              width: text === ":" ? "5px" : "10px",
              height: "14px",
            }}
            key={i}
          >
            <Typography
              sx={(theme) => ({
                position: "absolute",
                fontFamily: "Digital",
                fontSize: "22px",
                textAlign: "right",
                right: 0,
                color: theme.palette.digital.main,
              })}
            >
              {text}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                fontFamily: "Digital",
                fontSize: "22px",
                textAlign: "right",
                right: 0,
                opacity: 0.3,
                color: "digital.main",
              }}
            >
              {text !== ":" ? "8" : ":"}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Clock;
