import { Box, Paper, Stack, Typography, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { StyledList } from './style';

import Exam from './Exam';
import SelectClassType from '../../components/SelectClassType';
import { getExamsByType } from '../../api';
import { ExamType } from '../../model/Exam';
import { useNavigate } from 'react-router-dom';
import LeaderBoard from '../../components/LeaderBoard';
import { LBEnum } from '../../model/Standard';
import AnswerBtn from '../../components/AnswerBtn';
import { useAppSelector } from '../../hooks/redux';
import Chart from './Chart';

const ListExams = () => {
  const { code } = useAppSelector((state) => state.lesson);
  const [exams, setExams] = useState<ExamType[]>([]);
  const [selectedExam, setSelectedExam] = useState<ExamType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async (code: string) => {
      try {
        const { data: response } = await getExamsByType(code);
        setExams(response.data);
        setSelectedExam(response[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchExams(code);
  }, [code]);

  const handleChangeSelectedExam = (exam: ExamType) => {
    setSelectedExam(exam);
  };

  const handleShowExam = () => {
    if (!selectedExam) return;
    //navigate(`/sheet/${selectedExam.normalizedName}`);
    const newTab: Window | null = window.open(
      `/sheet/${selectedExam.normalizedName}`,
      '_blank'
    );
    newTab?.focus();
  };

  const handleShowAnswerSheet = () => {
    if (!selectedExam) return;
    // navigate(`/answersheet/${selectedExam.normalizedName}`);
    const newTab: Window | null = window.open(
      `/answersheet/${selectedExam.normalizedName}`,
      '_blank'
    );
    newTab?.focus();
  };

  return (
    <Grid
      container
      spacing={1}
      sx={{
        justifyContent: 'center',
      }}
    >
      <Grid item xs>
        <Stack
          direction="column"
          alignItems="center"
          mx={{ lg: 5, md: 2, xs: 0 }}
          sx={{ py: 2, flexGrow: 1, my: 0 }}
        >
          <SelectClassType />

          <Paper
            sx={{
              p: 2,
              width: '100%',
              mt: 2,
              flexGrow: 1,
              borderRadius: 4,
              boxShadow:
                '26px 26px 16px 4px rgba(110, 143, 148,0.76) !important',
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
              <AnswerBtn
                onChange={() => {
                  handleShowAnswerSheet();
                }}
              />
            </Stack>
          </Paper>
        </Stack>
      </Grid>
      <Grid item sx={{ width: { md: '500px', xs: '100%' } }}>
        <LeaderBoard
          type={LBEnum.score}
          examId={
            selectedExam && selectedExam._id ? selectedExam._id : undefined
          }
          examName={selectedExam ? selectedExam.name : ''}
          paperStyle={{
            boxShadow:
              '26px 26px 16px 4px rgba(110, 143, 148, 0.76) !important',

            m: 2,
            mx: { md: 2, xs: 0 },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          examId={
            selectedExam && selectedExam._id ? selectedExam._id : undefined
          }
        />
      </Grid>
    </Grid>
  );
};

export default ListExams;
