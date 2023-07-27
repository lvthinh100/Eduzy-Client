import React from "react";
import { Stack, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

type PropsType = {
  quantity: number;
  variant: "first" | "second" | "third";
};

const Crown: React.FC<PropsType> = ({ quantity, variant }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        fontSize: "14px",
        color: (theme) => theme.palette.prize[variant ?? "normal"],
      }}
    >
      <Typography fontSize="inherit">{quantity}</Typography>
      <EmojiEventsIcon fontSize="inherit" color="inherit" />
    </Stack>
  );
};

export default Crown;
