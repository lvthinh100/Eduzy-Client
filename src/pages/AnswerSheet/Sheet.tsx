import React, { useState } from "react";
import {
  Box,
  Grid,
  CardMedia,
  RadioGroup,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import AnswerRadio from "./AnswerRadio";

import exam from "../../constants/exam";

const Sheet = () => {
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.ANSWERS_LENGTH).fill("")
  );

  const generateChangeEventHandler = (index: number) => {
    const handleChangeAnswer = (event: React.ChangeEvent, value: string) => {
      const newAnswerSheet = [...answerSheet];
      newAnswerSheet[index] = value;
      setAnswerSheet(newAnswerSheet);
    };

    return handleChangeAnswer;
  };

  return (
    <Grid container spacing={1} my={2} bgcolor="#fae9ea">
      <Grid item md={10}>
        <Box
          sx={{
            maxHeight: "calc(100vh + 50px)",
            overflowY: "scroll",
            border: "1px solid red",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%" }}
            src="https://drive.google.com/uc?id=17y60ASL4BJxipnyPOCz-ddDgUvejtSYn"
          />
        </Box>
      </Grid>
      <Grid item md={2}>
        <Stack alignItems="center">
          <Box
            sx={{
              p: 1,
              border: "1px solid red",
              maxHeight: "100vh",
              overflowY: "scroll",
              width: "100%",
            }}
          >
            {answerSheet.map((value, index: number) => (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography>{index + 1}</Typography>
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
  );
};

export default Sheet;
