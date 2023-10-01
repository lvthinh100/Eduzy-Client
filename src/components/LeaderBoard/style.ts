import { styled, Badge, BadgeProps, Box, BoxProps, Theme } from '@mui/material';

export const StyledBadge = styled(Badge)<BadgeProps>(
  ({ theme, badgeContent }) => ({
    '& .MuiBadge-badge': {
      right: 35,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      ...(badgeContent === '1' && {
        backgroundColor: theme.palette.prize.first,
      }),
      ...(badgeContent === '2' && {
        backgroundColor: theme.palette.prize.second,
      }),
      ...(badgeContent === '3' && {
        backgroundColor: theme.palette.prize.third,
      }),
    },
  })
);
export const StandingBox = styled(Box)<BoxProps>(({ theme }) => ({
  borderRadius: '30px 30px 0 0',
  p: 1,
  color: 'white',
  fontSize: 25,
  fontFamily: 'SegoeUISemiBold',
}));
