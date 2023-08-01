import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import React from "react";
import {
  CustomSelect,
  StyledOption,
} from "../../components/CustomComponent/CustomSelect";
import Exam from "./Exam";
import { StyledList } from "./style";
import Prize from "../../components/Prize";

const ListExams = () => {
  return (
    <Stack direction="column" alignItems="center" sx={{ py: 2, flexGrow: 1 }}>
      <CustomSelect defaultValue={10}>
        <StyledOption value={10}>Documentation</StyledOption>
        <StyledOption value={20}>Components</StyledOption>
        <StyledOption value={30}>Features</StyledOption>
      </CustomSelect>
      <Paper sx={{ p: 2, width: "100%", mt: 2, flexGrow: 1 }} elevation={5}>
        <Typography textAlign="center" variant="h4">
          Danh sách đề thi
        </Typography>
        <Box sx={{ borderRadius: 2, p: 1 }} bgcolor="white">
          <StyledList>
            <Exam selected />
            <Exam />
            <Exam />
            <Exam />
            <Exam />
            <Exam />
            <Exam />
          </StyledList>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          marginTop={1}
        >
          <Button variant="gradient" sx={{ flexGrow: 1 }} disabled>
            <Typography marginRight={1} fontWeight="bold">
              Mua đề
            </Typography>
            <Prize crown={false} />
          </Button>
          <Button variant="gradient" sx={{ flexGrow: 1 }}>
            Làm bài
          </Button>
          <Button variant="gradient" sx={{ flexGrow: 1 }}>
            Phiếu trả lời
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ListExams;
