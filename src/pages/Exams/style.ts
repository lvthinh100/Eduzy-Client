import {
  Typography,
  TypographyProps,
  List,
  ListProps,
  ListItemButton,
  ListItemButtonProps,
  Badge,
  BadgeProps,
  styled,
  Input,
  InputProps,
  Box,
  BoxProps,
} from "@mui/material";

export const StyledTypo = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "bold",
}));

export const StyledList = styled(List)<ListProps>(({ theme }) => ({
  padding: 0,
  maxHeight: "400px",
  overflowY: "scroll",
}));

export const StyledListItem = styled(ListItemButton)<ListItemButtonProps>(
  ({ theme }) => ({
    "&.Mui-selected": {
      backgroundColor: theme.palette.highlighter.light,
      "&:hover": {
        backgroundColor: theme.palette.highlighter.light,
        opacity: 0.9,
      },
    },
  })
);

export const StyledBadge = styled(Badge)<BadgeProps>(
  ({ theme, badgeContent }) => ({
    "& .MuiBadge-badge": {
      right: 35,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
      ...(badgeContent === "1" && {
        backgroundColor: theme.palette.prize.first,
      }),
      ...(badgeContent === "2" && {
        backgroundColor: theme.palette.prize.second,
      }),
      ...(badgeContent === "3" && {
        backgroundColor: theme.palette.prize.third,
      }),
    },
  })
);

export const StyledInput = styled(Input)<InputProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 35,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export const StandingBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: "80%",
  borderRadius: "30px 30px 0 0",
  p: 1,
  color: "white",
  fontSize: 25,
  fontWeight: "bold",
}));
