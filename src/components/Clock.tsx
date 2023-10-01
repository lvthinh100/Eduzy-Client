import React from 'react';
import dayjs from 'dayjs';
import img from '../assets/KeSach2.jpg';

import { Box, Typography, CardMedia, Stack } from '@mui/material';
import { useAppSelector } from '../hooks/redux';

const Clock = () => {
  const format = 'HH:mm:ss';
  const { timediff } = useAppSelector((state) => state.app);
  const [current, setCurrent] = React.useState(
    dayjs()
      .add(timediff ? timediff : 0, 'second')
      .format(format)
  );

  React.useEffect(() => {
    if (timediff === null) return;
    const startUpdatingClock = () => {
      const timer = setInterval(() => {
        setCurrent(dayjs().add(timediff, 'second').format(format));
      }, 1000);
      return timer;
    };

    const now = dayjs().add(timediff, 'second');
    const timeUntilNextSecond = 1000 - now.millisecond();

    const timeout = setTimeout(() => {
      const timer = startUpdatingClock();
      return () => {
        clearInterval(timer);
      };
    }, timeUntilNextSecond);

    return () => {
      clearTimeout(timeout);
    };
  }, [timediff]);

  return (
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        sx={{
          height: 130,
          width: 'auto',
          display: 'inline-block',
          left: 'inherit',
          position: 'relative',
        }}
        src={img}
      />
      <Stack
        direction="row"
        fontWeight="bold"
        color="white"
        sx={{
          position: 'absolute',
          top: 58,
          right: 48,
        }}
      >
        {current.split('').map((text, i) => (
          <Box
            sx={{
              position: 'relative',
              width: text === ':' ? '5px' : '10px',
              height: '14px',
            }}
            key={i}
          >
            <Typography
              sx={(theme) => ({
                position: 'absolute',
                fontFamily: 'Digital',
                fontSize: '22px',
                textAlign: 'right',
                right: 0,
                color: theme.palette.digital.main,
              })}
            >
              {text}
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                fontFamily: 'Digital',
                fontSize: '22px',
                textAlign: 'right',
                right: 0,
                opacity: 0.3,
                color: 'digital.main',
              }}
            >
              {text !== ':' ? '8' : ':'}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Clock;
