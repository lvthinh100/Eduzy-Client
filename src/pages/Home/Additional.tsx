import React from 'react';
import { Stack, CardMedia } from '@mui/material';

import Clock from '../../components/Clock';

import useResponsive from '../../hooks/useResponsive';

import flowers from '../../assets/flowers.jpg';
import SelectClassType from '../../components/SelectClassType';
import Leader from './Leader';

const Additional = () => {
  const isDesktop = useResponsive('up', 'lg');
  return (
    <Stack direction="column" alignItems="center" sx={{ mt: 2 }}>
      {/* Select */}
      {isDesktop && <SelectClassType />}
      {/* Flower */}
      {
        <CardMedia
          component="img"
          sx={{
            height: 160,
            width: 'auto',
            display: 'inline-block',
            left: 'inherit',
          }}
          src={flowers}
        />
      }

      {/* Timer */}
      <Clock />

      {/* High Record */}
      <Leader />
    </Stack>
  );
};

export default Additional;
