import React from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import gradeBoardBtn from "../assets/gradeBoardBtn.png"; // Replace with the actual image path

const GradeLBbtn: React.FC = () => {
  return (
    <Button variant="gradient2" sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        alt="answer"
        src={gradeBoardBtn}
        sx={{
          mt: 0,
          height: 25,
          objectFit: "contain",
        }}
      />
    </Button>
  );
};

export default GradeLBbtn;
