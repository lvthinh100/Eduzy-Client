import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import img from "../assets/avatar.jpg";

const StudentInfo = () => {
  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        src={img}
        sx={{
          border: (theme) => `2px solid ${theme.palette.prize.first}`,
          width: "56px",
          height: "56px",
          m: "4px",
        }}
      />
      <Typography
        fontSize="14px"
        fontFamily="SegoeUISemiBold"
        maxWidth={200}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        Hoàng Văn Hòa
      </Typography>
      <Typography fontSize="12px"
        fontFamily="SegoeUISemiBold">#000006</Typography>
    </Stack>
  );
};

export default StudentInfo;
