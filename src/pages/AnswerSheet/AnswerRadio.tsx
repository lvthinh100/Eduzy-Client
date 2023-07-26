import React from "react";
import { Radio } from "@mui/material";
import { StyledBox } from "./style";

type PropsType = {
  value: "A" | "B" | "C" | "D";
};

const AnswerRadio: React.FC<PropsType> = ({ value }) => {
  return (
    <Radio
      disableRipple
      sx={{ p: 1 }}
      icon={
        <StyledBox>
          <span>{value}</span>
        </StyledBox>
      }
      checkedIcon={
        <StyledBox sx={{ backgroundColor: "gray" }}>
          <span>{value}</span>
        </StyledBox>
      }
      value={value}
    />
  );
};

export default AnswerRadio;
