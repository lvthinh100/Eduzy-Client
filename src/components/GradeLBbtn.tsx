import React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import gradeBoardBtn from '../assets/gradeBoardBtn.png'; // Replace with the actual image path
import { StyledButtonText } from '../pages/Home/style';

type GradeLBbtnProps = {
  onChange: () => void;
};

const GradeLBbtn: React.FC<GradeLBbtnProps> = ({ onChange }) => {
  return (
    <Button variant="gradient2" onClick={onChange} sx={{ flexGrow: 1 }}>
      <StyledButtonText>BXH</StyledButtonText>
      <CardMedia
        component="img"
        alt="answer"
        src={gradeBoardBtn}
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

export default GradeLBbtn;
