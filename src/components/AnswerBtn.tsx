import React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import answerIcon from '../assets/answerIcon.png'; // Replace with the actual image path
import { StyledButtonText } from '../pages/Home/style';

type AnswerBtnProps = {
  onChange: () => void;
};

const AnswerBtn: React.FC<AnswerBtnProps> = ({ onChange }) => {
  return (
    <Button variant="gradient2" onClick={onChange} sx={{ flexGrow: 1 }}>
      <StyledButtonText>Đ.ÁN</StyledButtonText>
      <CardMedia
        component="img"
        alt="answer"
        src={answerIcon}
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

export default AnswerBtn;
