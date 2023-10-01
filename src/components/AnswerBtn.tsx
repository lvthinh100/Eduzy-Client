import React from 'react';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import answerIcon from '../assets/answerIcon.png'; // Replace with the actual image path

type AnswerBtnProps = {
  onChange: () => void;
};

const AnswerBtn: React.FC<AnswerBtnProps> = ({ onChange }) => {
  return (
    <Button variant="gradient2" onClick={onChange} sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        alt="answer"
        src={answerIcon}
        sx={{
          mt: 0,
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
