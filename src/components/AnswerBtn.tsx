import React from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import answerIcon from "../assets/answerIcon.png"; // Replace with the actual image path

const AnswerBtn: React.FC = () => {
  return (
    <Button variant="gradient2" sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        alt="answer"
        src={answerIcon}
        sx={{
          mt: 0,
          height: 25,
          objectFit: "contain",
        }}
      />
    </Button>
  );
};

export default AnswerBtn;
