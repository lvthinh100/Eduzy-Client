import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import React from "react";
import { StyledList } from "./style";

import Exam from "./Exam";
import Prize from "../../components/Prize";
import SelectClassType from "../../components/SelectClassType";

const ListExams = () => {
  return (
    <Stack direction="column" alignItems="center" sx={{ py: 2, flexGrow: 1 }}>
      <SelectClassType />

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
