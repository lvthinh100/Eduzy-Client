import React, { Fragment, useState } from "react";
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
import exam from "../../constants/exam";
import useResponsive from "../../hooks/useResponsive";
import useToggleOpen from "../../hooks/useToggleOpen";
import Countdown from "../../components/Countdown";
import dayjs from "dayjs";
import { ExamType } from "../../model/Exam";
import { StudentInfo } from "../../model/Student";
import { useAppSelector } from "../../hooks/redux";

type PropsType = {
  exam: ExamType;
  student: StudentInfo;
};

const Sheet: React.FC<PropsType> = ({ exam, student }) => {
  const startTime = exam.startTime;
  const countDown = dayjs(startTime).diff(dayjs(), "minute");
  console.log("countDown", countDown);
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.numberOfQuestion).fill("")
  );
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
          <Countdown date={dayjs(startTime)} />
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
            <CardMedia
              component="img"
              sx={{ width: "100%" }}
              src={exam.questionUrl}
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
