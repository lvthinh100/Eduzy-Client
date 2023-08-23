import { Box, Paper, Stack, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledList } from "./style";

import Exam from "./Exam";
import SelectClassType from "../../components/SelectClassType";
import { getExams } from "../../api";
import { ExamType } from "../../model/Exam";

const ListExams = () => {
  const [exams, setExams] = useState<ExamType[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data: response } = await getExams();
        setExams(response.data);
        setSelectedExam(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExams();
  }, []);

  const handleChangeSelectedExam = (exam: ExamType) => {
    setSelectedExam(exam);
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{ py: 2, flexGrow: 1, mx: 5, my: 0 }}
    >
      <SelectClassType />

      <Paper
        sx={{
          p: 2,
          width: "100%",
          mt: 2,
          flexGrow: 1,
          borderRadius: 4,
          boxShadow: "26px 26px 16px 4px rgba(110, 143, 148,0.76) !important",
        }}
        elevation={5}
      >
        <Typography
          textAlign="center"
          variant="h4"
          color="#5A7F8F"
          fontFamily="SegoeUISemiBold"
        >
          Danh sách đề thi
        </Typography>
        <Box sx={{ borderRadius: 2, p: 1 }} bgcolor="#FDF5FA">
          <StyledList>
            {exams.map((ex) => (
              <Exam
                key={ex.examCode}
                exam={ex}
                selected={selectedExam?.examCode === ex.examCode}
                onSelectExam={handleChangeSelectedExam}
              />
            ))}
          </StyledList>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          marginTop={2}
        >
          <Button variant="gradient" sx={{ flexGrow: 1 }} disabled>
            {/* <Typography marginRight={1} fontWeight="bold">
              Mua đề
            </Typography>
            <Prize crown={false} /> */}
            Mua đề
          </Button>
          <Button variant="gradient" sx={{ flexGrow: 1 }}>
            Làm bài
          </Button>
          <Button variant="gradient" sx={{ flexGrow: 1 }}>
            Xem kết quả
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default ListExams;
