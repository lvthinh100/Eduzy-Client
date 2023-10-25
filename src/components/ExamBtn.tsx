import React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import examIcon from '../assets/examIcon.png'; // Replace with the actual image path
import { StyledButtonText } from '../pages/Home/style';

type ExamBtnProps = {
  onChange: () => void;
};

const ExamBtn: React.FC<ExamBtnProps> = ({ onChange }) => {
  return (
    <Button variant="gradient2" onClick={onChange} sx={{ flexGrow: 1 }}>
      <StyledButtonText>ĐỀ</StyledButtonText>
      <CardMedia
        component="img"
        alt="Exam"
        src={examIcon}
        sx={{
          mt: 0,
          ml: 1,
          height: 25,
          width: 'auto',
          display: 'inline-block',
          left: 'inherit',
        }}
      />
    </Button>
  );
};

export default ExamBtn;
