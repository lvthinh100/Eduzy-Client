import React from "react";
import CalendarContainer from "./CalendarContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import Reward from "./Reward";
import Prize from "../../components/Prize";

const UpcomingEvent = () => {
  return (
    <CalendarContainer>
      <Box sx={{ textAlign: "center", p: 2, position: "relative" }}>
        <Typography variant="h4" textTransform="uppercase">
          Kiểm tra
        </Typography>
        <Typography variant="subtitle2">Môn Vật Lý - 50m</Typography>
        <Typography variant="subtitle2">Đề Luyện Thi 3</Typography>
        <Typography variant="subtitle2">Ngày 14/7/2023 - 8:30 pm</Typography>
        <Typography variant="subtitle2">Nội dung: Luyện thi buổi 3</Typography>
        <Typography variant="subtitle2">Lượt Đăng ký</Typography>
        <Typography fontSize="2rem" fontWeight="bold">
          2
        </Typography>
        <Typography variant="subtitle2">20:10:43</Typography>

        <Typography fontWeight="bold">Giải thưởng</Typography>
        <Reward />
        <Button variant="gradient" sx={{ mt: 2 }}>
          <Stack direction="column">
            <Typography variant="subtitle2" color="white">
              Đăng ký kiểm tra
            </Typography>
            <Prize crown={false} />
          </Stack>
        </Button>
      </Box>
    </CalendarContainer>
  );
};

export default UpcomingEvent;
