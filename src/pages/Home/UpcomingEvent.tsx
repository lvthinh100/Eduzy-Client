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
import { getUpcomingLesson, registerExam } from "../../api";
import Countdown from "../../components/Countdown";
import { useAppDispatch } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";
import useAuth from "../../hooks/useAuth";

const UpcomingEvent = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [upcomingLesson, setUpcomingLesson] = useState<
    UpcomingLessonType | undefined
  >(undefined);
  const [is10MinEarly, setIs10MinEarly] = useState(false);
  const [hadRegister, setHadRegister] = useState(false);
  console.log("is10MinEarly", is10MinEarly);
  console.log("upcomingLesson", upcomingLesson);
  console.log("hadRegister", hadRegister);
  React.useEffect(() => {
    const fetchUpcomingLesson = async () => {
      const { data: response } = await getUpcomingLesson();
      setUpcomingLesson(response.data);

      //This is to determine is10MinEarly
      const updateCountdownStatus = () => {
        const currentTime = dayjs();
        const timeDifference = dayjs(upcomingLesson?.startTime).diff(
          currentTime,
          "second"
        );
        setIs10MinEarly(timeDifference <= 600 && timeDifference >= 0);
      };

      updateCountdownStatus();

      const timeUntil10MinBefore = dayjs(upcomingLesson?.startTime)
        .subtract(10, "minute")
        .diff(dayjs(), "millisecond");
      if (timeUntil10MinBefore > 0) {
        setTimeout(() => {
          updateCountdownStatus();
        }, timeUntil10MinBefore);
      }
    };

    try {
      fetchUpcomingLesson();
    } catch (err) {
      console.log(err);
    }
  }, []);

  React.useEffect(() => {
    if (!user || !user._id || !upcomingLesson) {
      setHadRegister(false);
      return;
    }
    const isUserRegistered = upcomingLesson.examId.listOfMainResult.some(
      (result) => result.studentId === user._id
    );
    setHadRegister(isUserRegistered);
  }, [user]);

  const handleRegisterExam = async () => {
    try {
      if (!user || !user._id || !upcomingLesson) {
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Bạn chưa đăng nhập",
          })
        );
        return;
      }
      await registerExam(upcomingLesson.examId._id, user._id);

      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Đăng ký kiểm tra thành công!",
        })
      );
    } catch (error) {
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Đăng ký kiểm tra không thành công!",
        })
      );
    }
  };

  return (
    <CalendarContainerLeft>
      <Box
        sx={{
          textAlign: "center",
          pb: 4,
          position: "relative",
          color: "#5A7F8F",
        }}
      >
        <Typography
          variant="h4"
          textTransform="uppercase"
          sx={{
            fontFamily: "ArialUnicodeMS",
            fontWeight: "600",
            fontSize: "30px",
            letterSpacing: ".05rem",
          }}
        >
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
        <Typography
          variant="subtitle2"
          sx={{
            fontFamily: "ArialUnicodeMS",
            fontWeight: "500",
            fontSize: "14px",
            mt: 2,
          }}
        >
          Lượt Đăng ký
        </Typography>
        <Typography
          sx={{ fontFamily: "Century", fontWeight: "600", fontSize: "36px" }}
        >
          {upcomingLesson?.examId.listOfMainResult.length || "0"}
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: "Segoe UI", fontWeight: "600", fontSize: "12px" }}
        >
          <Countdown date={dayjs(upcomingLesson?.startTime)} />
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            fontFamily: "Segoe UI",
            fontWeight: "700",
            fontSize: "14px",
            my: 2,
          }}
        >
          Giải thưởng
        </Typography>
        <Reward />
        <Button
          variant="gradient"
          sx={{ mt: 2, pb: 1, width: "250px" }}
          onClick={handleRegisterExam}
        >
          <Stack direction="column">
            <Typography
              mb={0.7}
              color="white"
              fontFamily="SegoeUISemiBold"
              textTransform="none"
              fontSize="15px"
              fontWeight="medium"
            >
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
