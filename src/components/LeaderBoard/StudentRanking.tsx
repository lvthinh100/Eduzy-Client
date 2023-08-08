import React from "react";
import { ListItem, Box, Typography, Stack, Avatar } from "@mui/material";
import img from "../../assets/avatar.jpg";
import Prize from "../Prize";

const StudentRanking = () => {
  return (
    <ListItem sx={{ px: 0 }}>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.darker,
          width: "100%",
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: 3,
        }} //    border: "1px solid #a9593d", boxShadow: 1,
      >
        <Typography fontFamily="SegoeUISemiBold" marginX={1}>
          04
        </Typography>
        <Stack direction="row" alignItems="flex-start" flexGrow={1}>
          <Avatar
            src={img}
            sx={{
              border: (theme) => `2px solid ${theme.palette.prize.first}`,
              width: "56px",
              height: "56px",
              m: "4px",
            }}
          />
          <Box ml={3}>
            <Typography fontFamily="SegoeUISemiBold">Hoàng Văn Hòa</Typography>
            <Typography>#00006</Typography>
            <Prize direction="row" variant="third" />
          </Box>
        </Stack>
        <Typography variant="subtitle2" marginX={1}>
          9.0
        </Typography>
      </Box>
    </ListItem>
  );
};

export default StudentRanking;
