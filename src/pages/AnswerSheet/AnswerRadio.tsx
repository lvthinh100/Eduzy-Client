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
      sx={{ px: 1, py: 0 }}
      icon={
        <StyledBox>
          <span>{value}</span>
        </StyledBox>
      }
      checkedIcon={
        <StyledBox sx={{ backgroundColor: "#828486" }}>
          <span style={{ opacity: "0.5" }}>{value}</span>
        </StyledBox>
      }
      value={value}
    />
  );
};

export default AnswerRadio;
