// Libs
import React, { useState } from "react";
import dayjs from "dayjs";

// UI Component
import CalendarContainer from "./CalendarContainer";
import { Box, Button, Stack, Typography } from "@mui/material";
import Reward from "./Reward";
import Prize from "../../components/Prize";

// Data
import { UpcomingLessonType } from "../../model/Lesson";
import { getUpcomingLesson } from "../../api";
import Countdown from "../../components/Countdown";

const UpcomingEvent = () => {
  const [upcomingLesson, setUpcomingLesson] = useState<
    UpcomingLessonType | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchUpcomingLesson = async () => {
      const { data: response } = await getUpcomingLesson();
      setUpcomingLesson(response.data);
    };

    try {
      fetchUpcomingLesson();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <CalendarContainer>
      <Box sx={{ textAlign: "center", p: 2, position: "relative" }}>
        <Typography variant="h4" textTransform="uppercase">
          Kiểm tra
        </Typography>
        <Typography variant="subtitle2">
          Môn {upcomingLesson?.examId.subject} -{" "}
          {upcomingLesson?.examId.duration}m
        </Typography>
        <Typography variant="subtitle2">
          {upcomingLesson?.examId.name}
        </Typography>
        <Typography variant="subtitle2">
          Ngày {dayjs(upcomingLesson?.startTime).format("DD-MM-YYYY - HH:mm")}
        </Typography>
        <Typography variant="subtitle2">
          Nội dung: {upcomingLesson?.lessonContent}
        </Typography>
        <Typography variant="subtitle2">Lượt Đăng ký</Typography>
        <Typography fontSize="2rem" fontWeight="bold">
          2
        </Typography>
        <Typography variant="subtitle2">
          <Countdown date={dayjs(upcomingLesson?.startTime)} />
        </Typography>

        <Typography variant="subtitle1" fontWeight="bold">
          Giải thưởng
        </Typography>
        <Reward />
        <Button variant="gradient" sx={{ mt: 2 }}>
          <Stack direction="column">
            <Typography variant="subtitle2" color="white">
              Đăng ký kiểm tra
            </Typography>
            <Prize crown={false} value={upcomingLesson?.examId.price} />
          </Stack>
        </Button>
      </Box>
    </CalendarContainer>
  );
};

export default UpcomingEvent;
