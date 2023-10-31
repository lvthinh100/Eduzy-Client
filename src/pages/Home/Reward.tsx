import React from 'react';
import img from '../../assets/Reward.png';
import { Box, CardMedia } from '@mui/material';
import Prize from '../../components/Prize';
import useResponsive from '../../hooks/useResponsive';

const Reward = () => {
  const isMobile = useResponsive('down', 'sm');
  const prizePos = {
    first: {
      x: 0,
      y: isMobile ? 110 : 128,
    },
    second: {
      x: isMobile ? 26 : 30,
      y: isMobile ? 35 : 44,
    },
    thirst: {
      x: isMobile ? 40 : 45,
      y: isMobile ? 184 : 214,
    },
  };
  const prizeFontSize = isMobile ? 10 : undefined;
  return (
    <Box sx={{ mt: 1 }}>
      <Box
        sx={{
          position: 'relative',
          width: 'auto',
          display: 'inline-block',
          left: 'inherit',
          height: 140,
          mx: 'auto',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: {
              sm: 120,
              xs: 105,
            },
            width: 'auto',
            display: 'inline-block',
            left: 'inherit',
            mx: 'auto',
            mt: '20px',
            position: 'relative',
          }}
          src={img}
        />
        <Box
          position="absolute"
          sx={{ top: prizePos.second.x, left: prizePos.second.y }}
        >
          <Prize
            //fontSize={prizeFontSize}
            direction="column"
            variant="second"
            value={22000}
          />
        </Box>
        <Box
          position="absolute"
          sx={{ top: prizePos.first.x, left: prizePos.first.y }}
        >
          <Prize
            //fontSize={prizeFontSize}
            direction="column"
            variant="first"
            value={33000}
          />
        </Box>
        <Box
          position="absolute"
          sx={{ top: prizePos.thirst.x, left: prizePos.thirst.y }}
        >
          <Prize
            //fontSize={prizeFontSize}
            direction="column"
            variant="third"
            value={11000}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Reward;
