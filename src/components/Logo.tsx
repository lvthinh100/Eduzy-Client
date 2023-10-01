import React from 'react';
import { CardMedia } from '@mui/material';
import img from '../assets/EduzyLogo.png';

const Logo: React.FC = () => {
  return (
    <CardMedia
      component="img"
      sx={{
        height: 18,
        width: 'auto',
        display: 'inline-block',
        left: 'inherit',
      }}
      src={img}
    />
  );
};

export default Logo;
