import React from "react";
import img from "../../assets/Reward.png";
import { Box, CardMedia } from "@mui/material";
import Prize from "../../components/Prize";

const Reward = () => {
  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          position: "relative",
          width: "fit-content",
          height: 130,
          mx: "auto",
        }}
      >
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
        <Box position="absolute" sx={{ top: 10, left: 44 }}>
          <Prize direction="column" variant="second" />
        </Box>
        <Box position="absolute" sx={{ top: -20, left: 128 }}>
          <Prize direction="column" variant="first" />
        </Box>
        <Box position="absolute" sx={{ top: 25, left: 214 }}>
          <Prize direction="column" variant="third" />
        </Box>
      </Box>
    </Box>
  );
};

export default Reward;
