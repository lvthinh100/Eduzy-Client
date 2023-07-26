import React from "react";
import { CardMedia } from "@mui/material";
import img from "../assets/EduzyLogo.png";

const Logo: React.FC = () => {
  return (
    <CardMedia
      component="img"
      sx={{
        height: 18,
        objectFit: "contain",
        width: "fit-content",
      }}
      src={img}
    />
  );
};

export default Logo;
