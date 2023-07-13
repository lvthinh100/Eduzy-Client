import React from "react";
import { Stack, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

type variant = "first" | "second" | "third";

type direction = "row" | "column";

type PropsType = {
  variant: variant;
  direction: direction;
};

const Prize: React.FC<PropsType> = ({ variant, direction }) => {
  return (
    <Stack
      sx={{ fontSize: "12px", color: (theme) => theme.palette.prize[variant] }}
      alignItems="center"
      direction={direction}
    >
      <Stack direction="row" alignItems="center">
        <Typography fontSize="inherit">1</Typography>
        <EmojiEventsIcon fontSize="inherit" />
      </Stack>
      <Stack direction="row" alignItems="center">
        <Typography fontSize="inherit">11.000</Typography>
        <MonetizationOnIcon fontSize="inherit" />
      </Stack>
    </Stack>
  );
};

export default Prize;
