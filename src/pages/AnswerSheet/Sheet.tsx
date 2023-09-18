import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Grid,
  CardMedia,
  RadioGroup,
  Stack,
  Typography,
  Button,
  Fab,
  Dialog,
  IconButton,
} from "@mui/material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CloseIcon from "@mui/icons-material/Close";

import AnswerRadio from "./AnswerRadio";
import useResponsive from "../../hooks/useResponsive";
import useToggleOpen from "../../hooks/useToggleOpen";
import Countdown from "../../components/Countdown";
import dayjs from "dayjs";
import { ExamType } from "../../model/Exam";
import { StudentInfo } from "../../model/Student";
import { useAppDispatch } from "../../hooks/redux";
import timeState from "./TimeState";
import { appActions } from "../../redux/slices/appSlice";

type PropsType = {
  exam: ExamType;
  student: StudentInfo;
  currentState: number;
  isAnswerSheet: boolean;
};

const Sheet: React.FC<PropsType> = ({
  exam,
  student,
  currentState,
  isAnswerSheet,
}) => {
  const dispatch = useAppDispatch();
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.numberOfQuestion).fill("")
  );

  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    setAnswerSheet(new Array(exam.numberOfQuestion).fill(""));
  }, [exam]);

  useEffect(() => {
    if (!exam._id) return;
    var newImgUrl = "";
    if (!isAnswerSheet && currentState >= timeState.inExam)
      newImgUrl = exam.questionUrl;

    //Kiểm tra điều kiện xem đáp án ở đây
    if (isAnswerSheet) {
      newImgUrl =
        currentState === timeState.afterExam && student._id
          ? exam.answerUrl
          : "";
    }

    if (isAnswerSheet) {
      if (
        newImgUrl === "" &&
        !student._id &&
        currentState === timeState.afterExam
      ) {
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Bạn cần đăng nhập để xem đáp án",
          })
        );
      }
    }

    setImgUrl(newImgUrl);
  }, [exam, student, currentState, isAnswerSheet]);

  const [openAnswer, handleOpenAnswer, handleCloseAnswer] =
    useToggleOpen(false);

  const isMobile = useResponsive("down", "md");

  const generateChangeEventHandler = (index: number) => {
    const handleChangeAnswer = (event: React.ChangeEvent, value: string) => {
      const newAnswerSheet = [...answerSheet];
      newAnswerSheet[index] = value;
      setAnswerSheet(newAnswerSheet);
    };

    return handleChangeAnswer;
  };

  const handleSubmit = async () => {
    const data = {
      studentId: student._id,
      studentName: student.fullName,
      examId: exam._id,
      answers: answerSheet,
    };

    try {
      const response = await fetch("/api/submitAnswers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle a successful response, e.g., show a success message
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Bài làm đã được nộp thành công!",
          })
        );
      } else {
        // Handle an error response, e.g., show an error message
        const responseData = await response.json();
        dispatch(
          appActions.showNotification({
            variant: "error",
            message: responseData.message || "Có lỗi xảy ra khi nộp bài.",
          })
        );
      }
    } catch (error) {
      // Handle a network error or any other unexpected error
      console.error("Error submitting answers:", error);
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Có lỗi xảy ra khi nộp bài.",
        })
      );
    }
  };

  useEffect(() => {
    if (exam.questionUrl === "") return;
    new Promise((resolve) => {
      const img = new Image();
      img.src = exam.questionUrl;
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        console.error("Failed to preload question image:", exam.questionUrl);
        resolve(false);
      };
    });
  }, [exam.questionUrl]);

  useEffect(() => {
    if (exam.answerUrl === "") return;
    new Promise<boolean>((resolve) => {
      const img = new Image();
      img.src = exam.answerUrl;
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        console.error("Failed to preload answer image:", exam.answerUrl);
        resolve(false);
      };
    });
  }, [exam.answerUrl]);

  return (
    <Fragment>
      <Grid item md={12} xs={12}>
        <Typography
          textAlign="center"
          fontWeight="bold"
          color="purple"
          fontFamily="Times New Roman"
          fontSize="18px"
        >
          {isAnswerSheet ? (
            <>
              {currentState < timeState.afterExam && (
                <>
                  Đáp án sẽ được mở sau:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, "minute")}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {" "}
              {currentState === timeState.beforeExam && (
                <>
                  Đề sẽ được mở sau:
                  <Countdown date={dayjs(exam.startTime)} />
                </>
              )}
              {currentState === timeState.inExam && (
                <>
                  Thời gian còn lại:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, "minute")}
                  />
                </>
              )}
            </>
          )}
        </Typography>
      </Grid>
      <Grid container spacing={1} my={2} bgcolor="#fae9ea">
        <Grid item xs>
          <Box
            sx={{
              maxHeight: "calc(100vh + 50px)",
              overflowY: "scroll",
              border: "1px solid #DE5173",
            }}
          >
            {/* Tạo 3 cái để ko cần reload khi đổi ảnh */}

            <CardMedia
              component="img"
              sx={{
                width: "100%",
                display: imgUrl === "" ? "block" : "none",
              }}
              src={""}
            />

            <CardMedia
              component="img"
              sx={{
                width: "100%",
                display: imgUrl === exam.questionUrl ? "block" : "none",
              }}
              src={exam.questionUrl}
            />

            <CardMedia
              component="img"
              sx={{
                width: "100%",
                display: imgUrl === exam.answerUrl ? "block" : "none",
              }}
              src={exam.answerUrl}
            />
          </Box>
        </Grid>
        <Grid
          item
          sx={{ width: "165px", display: { xs: "none", md: "block" } }}
        >
          <Stack alignItems="center">
            <Box
              sx={{
                pl: 1,
                border: "1px solid #DE5173",
                maxHeight: "100vh",
                overflowY: "scroll",
                width: "100%",
                backgroundColor: "white",
              }}
            >
              {answerSheet.map((value, index: number) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{}}
                >
                  <Typography fontFamily="Times New Roman">
                    {" "}
                    {index + 1}
                  </Typography>
                  <RadioGroup
                    value={answerSheet[index]}
                    row
                    onChange={generateChangeEventHandler(index)}
                  >
                    <AnswerRadio value="A" />
                    <AnswerRadio value="B" />
                    <AnswerRadio value="C" />
                    <AnswerRadio value="D" />
                  </RadioGroup>
                </Stack>
              ))}
            </Box>
            <Button variant="gradient" sx={{ my: 1, width: "150px" }}>
              {" "}
              Nộp bài{" "}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {isMobile && (
        <Fragment>
          <Fab
            size="medium"
            color="secondary"
            aria-label="open"
            sx={{ position: "fixed", bottom: 20, right: 10 }}
            onClick={handleOpenAnswer}
          >
            <FormatListNumberedIcon />
          </Fab>
          <Dialog open={openAnswer} maxWidth="md" onClose={handleCloseAnswer}>
            <Typography
              fontFamily="Times New Roman"
              fontWeight="bold"
              textAlign="center"
              fontSize="18px"
              mt={2}
            >
              PHIẾU TRẢ LỜI
            </Typography>
            <Box sx={{ px: 2 }}>
              <Grid
                container
                sx={{ padding: 1, my: 2, border: "1px solid #DE5173" }}
              >
                {answerSheet.map((value, index: number) => (
                  <Grid item xs={6}>
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography fontFamily="Times New Roman" minWidth={20}>
                        {index + 1}
                      </Typography>
                      <RadioGroup
                        value={answerSheet[index]}
                        row
                        onChange={generateChangeEventHandler(index)}
                      >
                        <AnswerRadio value="A" />
                        <AnswerRadio value="B" />
                        <AnswerRadio value="C" />
                        <AnswerRadio value="D" />
                      </RadioGroup>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Button
              variant="gradient"
              sx={{ my: 1, width: "150px", mx: "auto" }}
              onClick={handleSubmit}
            >
              Nộp bài
            </Button>
            <IconButton
              // onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              size="small"
              onClick={handleCloseAnswer}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Sheet;
