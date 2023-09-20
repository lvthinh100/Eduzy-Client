import React, { Fragment, useEffect, useState, useCallback } from "react";
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
import { AnswerEnum, AnswerType, ExamType } from "../../model/Exam";
import { StudentInfo } from "../../model/Student";
import { useAppDispatch } from "../../hooks/redux";
import timeState from "./TimeState";
import { appActions } from "../../redux/slices/appSlice";
import { postAnswer } from "../../api";
import { ResultType } from "../../model/Lesson";

type PropsType = {
  exam: ExamType;
  student: StudentInfo;
  currentState: number;
  isAnswerSheet: boolean;
  isSubmitted: boolean;
  onSubmit: (r: ResultType) => void;
};

const Sheet: React.FC<PropsType> = ({
  exam,
  student,
  currentState,
  isAnswerSheet,
  isSubmitted,
  onSubmit,
}) => {
  const dispatch = useAppDispatch();
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.numberOfQuestion).fill("")
  );

  const [imgUrl, setImgUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); //For prevent user from click too fast

  useEffect(() => {
    if (!exam._id) return;
    let newImgUrl = "";
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
  }, [exam, student, currentState, isAnswerSheet, dispatch]);

  const [openAnswer, handleOpenAnswer, handleCloseAnswer] =
    useToggleOpen(false);

  const isMobile = useResponsive("down", "md");

  const generateChangeEventHandler = (index: number) => {
    if (!(currentState === timeState.inExam)) return;
    const handleChangeAnswer = (event: React.ChangeEvent, value: string) => {
      const newAnswerSheet = [...answerSheet];
      newAnswerSheet[index] = value;
      setAnswerSheet(newAnswerSheet);
    };

    return handleChangeAnswer;
  };

  const handleSubmit = useCallback(async () => {
    setIsDisabled(true);
    if (!exam || !exam._id || isSubmitted) return;

    //Nộp bài trả về điểm và kết quả
    const data: AnswerType = {
      student: student._id,
      studentName: student.fullName,
      exam: exam._id,
      answer: answerSheet.map((char) => (char === "" ? " " : char)).join(""),
      type: exam.isUpcoming ? AnswerEnum.main : AnswerEnum.sub,
    };

    console.log(data);
    try {
      const { data: response } = await postAnswer(data);
      console.log("response", response);
      onSubmit(response);
    } catch (error) {
      console.error("Error submitting answers:", error);
      dispatch(
        appActions.showNotification({
          variant: "error",
          message: "Có lỗi xảy ra khi nộp bài.",
        })
      );
    }
  }, [answerSheet, dispatch, exam, isSubmitted, onSubmit, student]);

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

  useEffect(() => {
    setAnswerSheet(new Array(exam.numberOfQuestion).fill(""));
  }, [exam]);

  useEffect(() => {
    if (currentState === timeState.afterExam && isSubmitted === false) {
      handleSubmit();
    }
  }, [currentState, isSubmitted, handleSubmit]);

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
            {imgUrl === exam.questionUrl && (
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                }}
                src={exam.questionUrl}
              />
            )}

            {imgUrl === exam.answerUrl && (
              <CardMedia
                component="img"
                sx={{
                  width: "100%",
                }}
                src={exam.answerUrl}
              />
            )}
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
            <Button
              variant="gradient"
              sx={{ my: 1, width: "150px" }}
              disabled={
                currentState === timeState.inExam && !isDisabled ? false : true
              }
              onClick={handleSubmit}
            >
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
                  <Grid item xs={6} key={index}>
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
              disabled={currentState === timeState.inExam ? false : true}
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
