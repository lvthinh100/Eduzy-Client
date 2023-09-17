import React from "react";
import { Typography, Box } from "@mui/material";
import { StyledBox } from "./style";

type PropsType = {
  value: number;
  selected?: boolean;
};

const NumberCode: React.FC<PropsType> = ({ value, selected }) => {
  return (
    <StyledBox
      sx={{
        borderRadius: "50%",
        width: "14px",
        height: "14px",
        ...(selected && { backgroundColor: "#828486" }),
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          lineHeight: "12px",

          ...(selected && { opacity: "0.5" }),
        }}
      >
        {value}
      </Typography>
    </StyledBox>
  );
};

NumberCode.defaultProps = {
  selected: false,
};

export default NumberCode;
