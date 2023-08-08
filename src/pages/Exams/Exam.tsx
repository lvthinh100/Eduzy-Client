import React from "react";
import { Stack, ListItemButtonProps } from "@mui/material";
import { StyledListItem, StyledTypo } from "./style";
import Prize from "../../components/Prize";

const Exam: React.FC<ListItemButtonProps> = (props) => {
  return (
    <StyledListItem
      sx={{ border: "0.9px solid #FE6C85", borderRadius: 1.5, px: 2, py: 1, my: 1 }}
      {...props}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="column" alignItems="flex-start" >
          <StyledTypo >Đề luyện thi 3</StyledTypo>
          <StyledTypo mb={0.4}>50m - 40 câu</StyledTypo>
          <Prize crown={false} variant="first" />
        </Stack>
        <StyledTypo>Lượt mua: 3</StyledTypo>
      </Stack>
    </StyledListItem>
  );
};

export default Exam;
