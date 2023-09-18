import React from "react";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import examIcon from "../assets/examIcon.png"; // Replace with the actual image path

type ExamBtnProps = {
  onChange: () => void;
};

const ExamBtn: React.FC<ExamBtnProps> = ({ onChange }) => {
  return (
    <Button variant="gradient2" onClick={onChange} sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        alt="Exam"
        src={examIcon}
        sx={{
          mt: 0,
          height: 25,
          objectFit: "contain",
        }}
      />
    </Button>
  );
};

export default ExamBtn;
