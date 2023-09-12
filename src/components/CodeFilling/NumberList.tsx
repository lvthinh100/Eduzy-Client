import React from "react";
import { Stack, Typography } from "@mui/material";
import { StyledBox } from "./style";
import NumberCode from "./NumberCode";
import content from "../../constants/content";

type PropsType = {
  value: number;
};

const NumberList: React.FC<PropsType> = ({ value }) => {
  return (
    <Stack direction="column">
      <StyledBox mb={1}>
        <Typography
          sx={{
            fontFamily: "HandWriting",
            color: "blue",
          }}
        >
          {value}
        </Typography>
      </StyledBox>

      {content.NUMBERS.map((num, index) => (
        <StyledBox key={index}>
          <NumberCode value={num} selected={value === num} />
        </StyledBox>
      ))}
    </Stack>
  );
};

export default NumberList;
