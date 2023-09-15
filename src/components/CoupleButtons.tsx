import React from "react";
import Stack from "@mui/material/Stack";

import AnswerBtn from "./AnswerBtn";
import GradeLBbtn from "./GradeLBbtn";

const CoupleButtons: React.FC = () => {
  return (
    <Stack direction="row">
      <GradeLBbtn />
      <AnswerBtn />
    </Stack>
  );
};

export default CoupleButtons;
