import React from "react";
import dayjs from "dayjs";
import img from "../assets/KeSach2.png";

import { Box, Typography, CardMedia, Stack } from "@mui/material";

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
      <Stack
        direction="row"
        fontWeight="bold"
        color="white"
        sx={{
          position: "absolute",
          top: 95,
          right: 80,
        }}
      >
        {current.split("").map((text) => (
          <Box
            sx={{
              position: "relative",
              width: text === ":" ? "5px" : "14px",
              height: "14px",
            }}
          >
            <Typography
              sx={(theme) => ({
                position: "absolute",
                fontFamily: "Digital",
                fontSize: "28px",
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
                fontSize: "28px",
                textAlign: "right",
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
