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
      <Typography fontWeight="bold">Hoàng Văn Hòa</Typography>
      <Typography>#00006</Typography>
    </Stack>
  );
};

export default StudentInfo;
