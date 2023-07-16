import React from "react";
import img from "../../assets/Reward.png";
import { Box, CardMedia } from "@mui/material";
import Prize from "../../components/Prize";

const Reward = () => {
  return (
    <Box position="relative">
      <CardMedia
        component="img"
        sx={{
          height: 120,
          objectFit: "contain",
          width: "fit-content",
          mx: "auto",
          mt: "20px",
          position: "relative",
        }}
        src={img}
      />
      <Box position="absolute" sx={{ top: 10, left: 50 }}>
        <Prize direction="column" variant="second" />
      </Box>
      <Box position="absolute" sx={{ top: -20, left: 130 }}>
        <Prize direction="column" variant="first" />
      </Box>
      <Box position="absolute" sx={{ top: 25, left: 220 }}>
        <Prize direction="column" variant="third" />
      </Box>
    </Box>
  );
};

export default Reward;
