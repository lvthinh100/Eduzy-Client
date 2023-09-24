// Libs
import { Fragment, useEffect, useState } from "react";
import dayjs from "dayjs";

// UI Component
import CalendarContainerLeft from "./CalendarContainerLeft";
import { Box, Button, Dialog, Stack, Typography } from "@mui/material";
import Reward from "./Reward";
import { CustomSubtitleTypography, StyledButtonText } from "./style";
import { useNavigate } from "react-router-dom";
// Data
import { UpcomingLessonType } from "../../model/Lesson";
import { getPrevLesson, getUpcomingLesson } from "../../api";
import Countdown from "../../components/Countdown";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";
import GradeLBbtn from "../../components/GradeLBbtn";
import AnswerBtn from "../../components/AnswerBtn";
import LeaderBoard from "../../components/LeaderBoard";
import { LBEnum } from "../../model/Standard";

const UpcomingEvent = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { fetching, code } = useAppSelector((state) => state.lesson);
  const [upcomingLesson, setUpComingLesson] =
    useState<UpcomingLessonType | null>(null);
  const [prevLesson, setPrevLesson] = useState<UpcomingLessonType | null>(null);
  const isLyThuyet = upcomingLesson?.lessonType === "LyThuyet";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingLesson = async (type: string) => {
      try {
        const { data: response } = await getUpcomingLesson(type as string);
        setUpComingLesson(response.data);
      } catch (err) {
        setUpComingLesson(null);
      }
    };
    const fetchPrevLesson = async (type: string) => {
      try {
        const { data: response } = await getPrevLesson(type as string);
        setPrevLesson(response.data);
      } catch (err) {
        setPrevLesson(null);
      }
    };
    fetchUpcomingLesson(code);
    fetchPrevLesson(code);
  }, [code, fetching, dispatch]);

  const handleShowPrevLeaderBoard = () => {
    setIsOpen(true);
  };

  const handleShowAnswerSheet = () => {
    navigate(`/answersheet/${prevLesson?.examId?.normalizedName}`);
  };

  const handleShowExam = () => {
    navigate(`/sheet/${upcomingLesson?.examId?.normalizedName}`);
  };

  return (
    <CalendarContainerLeft>
      {upcomingLesson ? (
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
              fontSize: "24px !important",
              letterSpacing: ".05rem",
            }}
          >
            {!isLyThuyet ? upcomingLesson.lessonContent : "HỌC LÝ THUYẾT"}
          </Typography>

          <CustomSubtitleTypography variant="subtitle2">
            Môn {upcomingLesson?.subject} - {upcomingLesson?.duration}m
          </CustomSubtitleTypography>

          <CustomSubtitleTypography variant="subtitle2">
            Ngày {dayjs(upcomingLesson?.startTime).format("DD-MM-YYYY - HH:mm")}
          </CustomSubtitleTypography>
          <Typography fontSize={28}>
            {!isLyThuyet
              ? upcomingLesson?.examId?.name
              : upcomingLesson.lessonContent}
          </Typography>
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
                  sx={{ mt: 2, pb: 1, flexGrow: 1, mb: 1.5 }}
                  onClick={handleShowExam}
                >
                  <Stack direction="column">
                    <StyledButtonText>LUYỆN ĐỀ</StyledButtonText>
                  </Stack>
                </Button>
                {prevLesson && (
                  <Stack direction="row">
                    <GradeLBbtn
                      onChange={() => {
                        handleShowPrevLeaderBoard();
                      }}
                    />
                    <AnswerBtn
                      onChange={() => {
                        handleShowAnswerSheet();
                      }}
                    />
                  </Stack>
                )}
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
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 9,
            position: "relative",
            color: "#5A7F8F",
            height: "200px",
          }}
        >
          <Typography
            variant="h4"
            textTransform="uppercase"
            sx={{
              fontFamily: "ArialUnicodeMS",
              fontWeight: "600",
              fontSize: "24px !important",
              letterSpacing: ".05rem",
            }}
          >
            CHƯA CÓ BÀI HỌC MỚI
          </Typography>
        </Box>
      )}
      <Dialog
        open={isOpen}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={() => setIsOpen(false)}
      >
        <LeaderBoard
          type={LBEnum.score}
          examId={
            prevLesson && prevLesson.examId ? prevLesson.examId._id : undefined
          }
          examName={prevLesson ? prevLesson.examId?.name : ""}
        />
      </Dialog>
    </CalendarContainerLeft>
  );
};

export default UpcomingEvent;
