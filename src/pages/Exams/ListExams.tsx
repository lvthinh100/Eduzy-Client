import { Box, Paper, Stack, Typography, Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledList } from "./style";

import Exam from "./Exam";
import SelectClassType from "../../components/SelectClassType";
import { getExams } from "../../api";
import { ExamType } from "../../model/Exam";
import { useNavigate } from "react-router-dom";
import LeaderBoard from "../../components/LeaderBoard";
import { LBEnum } from "../../model/Standard";
import AnswerBtn from "../../components/AnswerBtn";

const ListExams = () => {
  const [exams, setExams] = useState<ExamType[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const { data: response } = await getExams();
        setExams(response.data);
        setSelectedExam(response[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExams();
  }, []);

  const handleChangeSelectedExam = (exam: ExamType) => {
    setSelectedExam(exam);
  };

  const handleShowExam = () => {
    if (!selectedExam) return;
    navigate(`/sheet/${selectedExam._id}`);
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        justifyContent: "center",
      }}
    >
      <Grid item xs sx={{ minWidth: "500px" }}>
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
              boxShadow:
                "26px 26px 16px 4px rgba(110, 143, 148,0.76) !important",
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
              <Button
                variant="gradient"
                sx={{ flexGrow: 1 }}
                onClick={handleShowExam}
              >
                Làm bài
              </Button>
              {/* <Button variant="gradient" sx={{ flexGrow: 1 }}>
                Xem kết quả
              </Button> */}
              <AnswerBtn onChange={() => {}} />
            </Stack>
          </Paper>
        </Stack>
      </Grid>
      <Grid item sx={{ width: { md: "500px", xs: "100%" } }}>
        <LeaderBoard
          type={LBEnum.score}
          examId={
            selectedExam && selectedExam._id ? selectedExam._id : undefined
          }
          examName={selectedExam ? selectedExam.name : ""}
          paperStyle={{
            boxShadow:
              "26px 26px 16px 4px rgba(110, 143, 148, 0.76) !important",
            m: 2,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ListExams;
