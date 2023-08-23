import React from "react";
import { Stack, ListItemButtonProps } from "@mui/material";
import { StyledListItem, StyledTypo } from "./style";
import Prize from "../../components/Prize";
import { ExamType } from "../../model/Exam";

type PropsType = ListItemButtonProps & {
  exam: ExamType;
  onSelectExam: (exam: ExamType) => void;
};

const Exam: React.FC<PropsType> = ({ exam, onSelectExam, ...other }) => {
  const handleSelect = () => {
    onSelectExam(exam);
  };

  return (
    <StyledListItem
      sx={{
        border: "0.9px solid #FE6C85",
        borderRadius: 1.5,
        px: 2,
        py: 1,
        my: 1,
      }}
      onClick={handleSelect}
      {...other}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="column" alignItems="flex-start">
          <StyledTypo> {exam.name} </StyledTypo>
          <StyledTypo mb={0.4}>{exam.duration}m - 40 câu</StyledTypo>
          <Prize crown={false} variant="first" value={exam.price} />
        </Stack>
        <StyledTypo>Lượt mua: 0</StyledTypo>
      </Stack>
    </StyledListItem>
  );
};

export default Exam;
