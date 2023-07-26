import React from "react";
import { Stack, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

type variant = "first" | "second" | "third" | "normal";

type direction = "row" | "column";

type PropsType = {
  variant?: variant;
  direction?: direction;
  crown?: boolean;
};

const Prize: React.FC<PropsType> = ({ variant, direction, crown }) => {
  return (
    <Stack
      sx={{
        fontSize: "12px",
        color: (theme) => theme.palette.prize[variant ?? "normal"],
      }}
      alignItems="center"
      direction={direction}
    >
      {crown && (
        <Stack direction="row" alignItems="center">
          <Typography fontSize="inherit">1</Typography>
          <EmojiEventsIcon fontSize="inherit" />
        </Stack>
      )}
      <Stack direction="row" alignItems="center">
        <Typography fontSize="inherit">11.000</Typography>
        <MonetizationOnIcon fontSize="inherit" />
      </Stack>
    </Stack>
  );
};

Prize.defaultProps = {
  crown: true,
  direction: "column",
  variant: "normal",
};

export default Prize;
