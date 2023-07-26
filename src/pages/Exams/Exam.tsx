import React from "react";
import { Stack, Typography } from "@mui/material";
import { StyledListItem, StyledTypo } from "./style";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

type PropsType = {};

const Exam: React.FC<PropsType> = () => {
  return (
    <StyledListItem
      sx={{ border: "1px solid red", borderRadius: 2, px: 2, py: 1, my: 1 }}
      selected
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
      >
        <Stack direction="column" alignItems="flex-start">
          <StyledTypo fontSize="18px">Đề luyện thi 3</StyledTypo>
          <StyledTypo>50m - 40 câu</StyledTypo>
          <Stack direction="row" alignItems="center">
            <MonetizationOnIcon
              sx={{ width: "16px", height: "16px", color: "highlighter.main" }}
            />
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "highlighter.main",
              }}
            >
              12 000
            </Typography>
          </Stack>
        </Stack>
        <StyledTypo>Lượt mua: 3</StyledTypo>
      </Stack>
    </StyledListItem>
  );
};

export default Exam;
