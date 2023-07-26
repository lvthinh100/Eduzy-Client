import React, { useState } from "react";
import {
  Box,
  Grid,
  CardMedia,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import AnswerRadio from "./AnswerRadio";

import exam from "../../constants/exam";

const Sheet = () => {
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.ANSWERS_LENGTH).fill("")
  );
  console.log(answerSheet);

  const generateChangeEventHandler = (index: number) => {
    const handleChangeAnswer = (event: React.ChangeEvent, value: string) => {
      const newAnswerSheet = [...answerSheet];
      newAnswerSheet[index] = value;
      setAnswerSheet(newAnswerSheet);
    };

    return handleChangeAnswer;
  };

  return (
    <Grid container spacing={1} my={2}>
      <Grid item md={10}>
        <Box sx={{ maxHeight: "100vh", overflowY: "scroll" }}>
          <CardMedia
            component="img"
            sx={{ width: "100%" }}
            src="https://drive.google.com/uc?id=17y60ASL4BJxipnyPOCz-ddDgUvejtSYn"
          />
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box
          sx={{
            p: 1,
            border: "1px solid red",
            maxHeight: "100vh",
            overflowY: "scroll",
          }}
        >
          {/* <Stack direction="row" alignItems="center">
            <Typography>1</Typography>
            <RadioGroup value="B" row onChange={} >
              <AnswerRadio value="A" />
              <AnswerRadio value="B" />
              <AnswerRadio value="C" />
              <AnswerRadio value="D" />
            </RadioGroup>
          </Stack> */}
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
      </Grid>
    </Grid>
  );
};

export default Sheet;
