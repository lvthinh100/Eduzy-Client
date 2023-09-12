// Libs
import React, { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";

// UI Component
import CalendarContainerLeft from "./CalendarContainerLeft";
import { Box, Button, Stack, Typography } from "@mui/material";
import Reward from "./Reward";
import { CustomSubtitleTypography, StyledButtonText } from "./style";
import ProtectedButton from "../../components/Auth/ProtectedButton";
import { useNavigate } from "react-router-dom";

// Data
import { UpcomingLessonType } from "../../model/Lesson";
import { getUpcomingLesson } from "../../api";
import Countdown from "../../components/Countdown";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";

const UpcomingEvent = () => {
  const dispatch = useAppDispatch();
  const { fetching, code } = useAppSelector((state) => state.lesson);
  const [upcomingLesson, setUpComingLesson] =
    useState<UpcomingLessonType | null>(null);
  const isLyThuyet = upcomingLesson?.lessonType === "LyThuyet";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingLesson = async (type: string) => {
      try {
        const { data: response } = await getUpcomingLesson(type as string);
        setUpComingLesson(response.data);
      } catch (err) {
        console.log(err);
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Lỗi khi fetch upcoming lesson",
          })
        );
      }
    };
    fetchUpcomingLesson(code);
  }, [code, fetching, dispatch]);

  const handleShowPrevLeaderBoard = () => {
    console.log("This is leader board");
  };

  const handleShowExam = () => {
    navigate(`/sheet/${upcomingLesson?.examId?._id}`);
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
          {upcomingLesson?.lessonContent}
        </Typography>
        <CustomSubtitleTypography variant="subtitle2">
          Môn {upcomingLesson?.examId?.subject} -{" "}
          {upcomingLesson?.examId?.duration}m
        </CustomSubtitleTypography>

        <CustomSubtitleTypography variant="subtitle2">
          Ngày {dayjs(upcomingLesson?.startTime).format("DD-MM-YYYY - HH:mm")}
        </CustomSubtitleTypography>
        <Typography fontSize={40}>{upcomingLesson?.examId?.name}</Typography>
        <Typography
          variant="subtitle2"
          sx={{ fontFamily: "Segoe UI", fontWeight: "600", fontSize: "12px" }}
        >
          <Countdown
            key={upcomingLesson?._id}
            date={dayjs(upcomingLesson?.startTime)}
          />
        </Typography>
        {!isLyThuyet && (
          <Fragment>
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
          </Fragment>
        )}

        <Stack px={2}>
          {!isLyThuyet && (
            <Fragment>
              <Button
                variant="gradient"
                sx={{ mt: 2, pb: 1, flexGrow: 1 }}
                onClick={handleShowExam}
              >
                <Stack direction="column">
                  <StyledButtonText>Kiểm Tra</StyledButtonText>
                  <StyledButtonText>
                    {upcomingLesson?.examId?.name}
                  </StyledButtonText>
                </Stack>
              </Button>
              <Stack direction="row" gap={1}>
                <ProtectedButton
                  variant="gradient2"
                  sx={{ mt: 2, pb: 1, flexGrow: 1 }}
                  onClick={handleShowPrevLeaderBoard}
                >
                  <Stack direction="column">
                    <StyledButtonText>Đáp án</StyledButtonText>
                    <StyledButtonText>Đề luyện thi 1</StyledButtonText>
                  </Stack>
                </ProtectedButton>
                <ProtectedButton
                  variant="gradient2"
                  sx={{ mt: 2, pb: 1, flexGrow: 1 }}
                  // onClick={handleRegisterExam}
                >
                  <Stack direction="column">
                    <StyledButtonText>Bảng xếp hạng</StyledButtonText>
                    <StyledButtonText>Đề luyện thi 1</StyledButtonText>
                  </Stack>
                </ProtectedButton>
              </Stack>
            </Fragment>
          )}
          {isLyThuyet && (
            <Button
              variant="gradient2"
              LinkComponent="a"
              href={upcomingLesson.lessonMeetingUrl}
            >
              Tham gia học
            </Button>
          )}
        </Stack>
      </Box>
    </CalendarContainerLeft>
  );
};

export default UpcomingEvent;
