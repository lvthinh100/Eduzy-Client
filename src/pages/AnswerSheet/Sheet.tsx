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
import {
  AnswerEnum,
  AnswerType,
  ExamType,
  FetchAnswerIdType,
  FetchAnswerType,
  defaultResult,
} from "../../model/Exam";
import { StudentInfo } from "../../model/Student";
import { useAppDispatch } from "../../hooks/redux";
import timeState from "./TimeState";
import { appActions } from "../../redux/slices/appSlice";
import { fetchAnswer, fetchAnswerById, postAnswer } from "../../api";
import { ResultType } from "../../model/Exam";
import SlotMachineDialog from "./SlotMachineDialog";

type PropsType = {
  exam: ExamType;
  student: StudentInfo;
  currentState: number;
  isAnswerSheet: boolean;
  isSubmitted: boolean;
  result: ResultType | null;
  onSubmit: (r: ResultType) => void;
  setResult: (r: ResultType) => void;
  reloadUser: () => void;
};

const Sheet: React.FC<PropsType> = ({
  exam,
  student,
  currentState,
  isAnswerSheet,
  isSubmitted,
  onSubmit,
  result,
  setResult,
  reloadUser,
}) => {
  const dispatch = useAppDispatch();
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.numberOfQuestion).fill("")
  );

  const [imgUrl, setImgUrl] = useState("");
  const [isDisabled, setIsDisabled] = useState(false); //For prevent user from click too fast

  const [isPrize, setIsPrize] = useState(false);
  const [isOpenSlotMachineDialog, setIsOpenSlotMachineDialog] = useState(false);

  const [colorProp, setColorProp] = useState(0);

  const fetchResult = useCallback(async () => {
    if (
      isPrize === false &&
      exam.isUpcoming &&
      exam._id &&
      isSubmitted &&
      result &&
      currentState === timeState.afterExam
    ) {
      const data: FetchAnswerIdType = {
        _id: result._id,
        exam: exam._id,
      };
      try {
        const { data: response } = await fetchAnswerById(data);
        setResult(response);
        if (response.isPrized) {
          //Hiện form tổng kết ở đây
          if (response.coins > 0) {
            if (response.crown1 > 0) setColorProp(0);
            if (response.crown2 > 0) setColorProp(1);
            if (response.crown3 > 0) setColorProp(2);
            setIsOpenSlotMachineDialog(true);
            reloadUser();
          }
          setIsPrize(response.isPrized);
        }
      } catch (error) {}
    }
  }, [isPrize, exam, isSubmitted, result, currentState, setResult, reloadUser]);

  useEffect(() => {
    if (
      !(
        isPrize === false &&
        exam.isUpcoming &&
        isSubmitted &&
        result &&
        result._id !== "" &&
        currentState === timeState.afterExam
      )
    )
      return;

    fetchResult();

    const intervalId = setInterval(() => {
      fetchResult();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [fetchResult, isPrize, exam, isSubmitted, result, currentState]);

  useEffect(() => {
    const fetchAnswerData = async () => {
      if (
        isAnswerSheet &&
        result === null &&
        student._id !== null &&
        exam !== null &&
        exam._id !== null &&
        currentState === timeState.afterExam
      ) {
        const data: FetchAnswerType = {
          student: student._id,
          exam: exam._id,
        };

        try {
          const { data: response } = await fetchAnswer(data);
          setResult(response);
          let charArray = response.answer.split("");
          setAnswerSheet(charArray);
        } catch (error) {
          setResult(defaultResult);
          const spacesString = " ".repeat(exam.numberOfQuestion);
          const charArray = spacesString.split("");
          setAnswerSheet(charArray);
        }
      }
    };

    fetchAnswerData();
  }, [isAnswerSheet, result, student, dispatch, exam, setResult, currentState]);

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

    const data: AnswerType = {
      student: student._id,
      studentName: student.fullName,
      exam: exam._id,
      answer: answerSheet.map((char) => (char === "" ? " " : char)).join(""),
      type: exam.isUpcoming ? AnswerEnum.main : AnswerEnum.sub,
    };
    try {
      const { data: response } = await postAnswer(data);
      onSubmit(response);
    } catch (error) {
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
        resolve(false);
      };
    });
  }, [exam.answerUrl]);

  useEffect(() => {
    if (currentState > timeState.beforeExam) return;
    setAnswerSheet(new Array(exam.numberOfQuestion).fill(""));
  }, [exam, currentState]);

  const [prevCurrentState, setPrevCurrentState] = useState<Number | null>(null); //For check currentState change from 2 to 3

  useEffect(() => {
    if (
      prevCurrentState === timeState.inExam &&
      currentState === timeState.afterExam &&
      isSubmitted === false
    ) {
      handleSubmit();
    }
    setPrevCurrentState(currentState);
  }, [currentState, isSubmitted, handleSubmit, prevCurrentState]);

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
              {currentState === timeState.inExam && !isSubmitted && (
                <>
                  Thời gian còn lại:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, "minute")}
                  />
                </>
              )}
              {currentState === timeState.inExam && isSubmitted && (
                <>
                  Kết quả sẽ có sau:
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
                  sx={{
                    backgroundColor:
                      currentState === timeState.afterExam && result
                        ? answerSheet[index] === exam.answerSheet[index]
                          ? "#AAD0AA"
                          : "#EAC8C8"
                        : "white",
                  }}
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
                    <AnswerRadio
                      value="A"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === "A"
                      }
                    />
                    <AnswerRadio
                      value="B"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === "B"
                      }
                    />
                    <AnswerRadio
                      value="C"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === "C"
                      }
                    />
                    <AnswerRadio
                      value="D"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === "D"
                      }
                    />
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
                direction="column"
                sx={{ padding: 1, my: 2, border: "1px solid #DE5173" }}
              >
                {answerSheet.map((value, index: number) => (
                  <Grid item xs={6} key={index}>
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        backgroundColor:
                          currentState === timeState.afterExam && result
                            ? answerSheet[index] === exam.answerSheet[index]
                              ? "#AAD0AA"
                              : "#EAC8C8"
                            : "white",
                      }}
                    >
                      <Typography fontFamily="Times New Roman" minWidth={20}>
                        {index + 1}
                      </Typography>
                      <RadioGroup
                        value={answerSheet[index]}
                        row
                        onChange={generateChangeEventHandler(index)}
                      >
                        <AnswerRadio
                          value="A"
                          isGreen={
                            currentState === timeState.afterExam &&
                            result !== null &&
                            answerSheet[index] !== exam.answerSheet[index] &&
                            exam.answerSheet[index] === "A"
                          }
                        />
                        <AnswerRadio
                          value="B"
                          isGreen={
                            currentState === timeState.afterExam &&
                            result !== null &&
                            answerSheet[index] !== exam.answerSheet[index] &&
                            exam.answerSheet[index] === "B"
                          }
                        />
                        <AnswerRadio
                          value="C"
                          isGreen={
                            currentState === timeState.afterExam &&
                            result !== null &&
                            answerSheet[index] !== exam.answerSheet[index] &&
                            exam.answerSheet[index] === "C"
                          }
                        />
                        <AnswerRadio
                          value="D"
                          isGreen={
                            currentState === timeState.afterExam &&
                            result !== null &&
                            answerSheet[index] !== exam.answerSheet[index] &&
                            exam.answerSheet[index] === "D"
                          }
                        />
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
      <SlotMachineDialog
        colorProp={colorProp}
        coinsValue={result ? result.coins : 11000}
        open={isOpenSlotMachineDialog}
        handleClose={() => setIsOpenSlotMachineDialog(false)}
      />
    </Fragment>
  );
};

export default Sheet;
