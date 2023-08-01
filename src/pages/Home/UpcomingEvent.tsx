// Libs
import React, { useState } from "react";
import dayjs from "dayjs";

// UI Component
import CalendarContainerLeft from "./CalendarContainerLeft";
import { Box, Button, Stack, Typography } from "@mui/material";
import Reward from "./Reward";
import Prize from "../../components/Prize";
import { CustomSubtitleTypography } from "./style";

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
    <CalendarContainerLeft>
      <Box sx={{ textAlign: "center", pb: 4, position: "relative", color:"#5A7F8F" }}>
        <Typography variant="h4" textTransform="uppercase" 
        sx={{ fontFamily:"Roboto", fontWeight:"600", fontSize:"30px"
        , letterSpacing:".05rem" }}>
          Kiểm tra
        </Typography>
        <CustomSubtitleTypography variant="subtitle2">
          Môn {upcomingLesson?.examId.subject} -{" "}
          {upcomingLesson?.examId.duration}m
        </CustomSubtitleTypography>
        <CustomSubtitleTypography variant="subtitle2">
          {upcomingLesson?.examId.name}
        </CustomSubtitleTypography>
        <CustomSubtitleTypography variant="subtitle2">
          Ngày {dayjs(upcomingLesson?.startTime).format("DD-MM-YYYY - HH:mm")}
        </CustomSubtitleTypography>
        <CustomSubtitleTypography variant="subtitle2">
          Nội dung: {upcomingLesson?.lessonContent}
        </CustomSubtitleTypography>
        <Typography variant="subtitle2"
        sx={{ fontFamily:"Arial Unicode MS", fontWeight:"500", fontSize:"14px"
        , mt:2 }}>Lượt Đăng ký</Typography>
        <Typography sx={{ fontFamily:"Century", fontWeight:"600", fontSize:"36px"
        }}>
          2
        </Typography>
        <Typography variant="subtitle2" sx={{ fontFamily:"Segoe UI", fontWeight:"600", fontSize:"12px"
        }}>
          <Countdown date={dayjs(upcomingLesson?.startTime)} />
        </Typography>

        <Typography variant="subtitle1" sx={{ fontFamily:"Segoe UI", fontWeight:"700", fontSize:"14px"
        ,mt:2}}>
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
    </CalendarContainerLeft>
  );
};

export default UpcomingEvent;
