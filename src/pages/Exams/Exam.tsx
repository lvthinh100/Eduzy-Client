import React from 'react';
import { Stack, ListItemButtonProps, Rating } from '@mui/material';
import { StyledListItem, StyledTypo } from './style';
import { ExamType } from '../../model/Exam';
import useResponsive from '../../hooks/useResponsive';
import labels from '../../constants/labels';

type PropsType = ListItemButtonProps & {
  exam: ExamType;
  onSelectExam: (exam: ExamType) => void;
};

const Exam: React.FC<PropsType> = ({ exam, onSelectExam, ...other }) => {
  const handleSelect = () => {
    onSelectExam(exam);
  };
  const isMobile = useResponsive('down', 'sm');
  // const labels: { [index: string]: string } = {
  //   1: 'Rất dễ',
  //   2: 'Dễ',
  //   3: 'Trung bình',
  //   4: 'Khó',
  //   5: 'Rất khó',
  // };
  return (
    <StyledListItem
      sx={{
        border: '0.9px solid #FE6C85',
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
          <StyledTypo>
            {exam.duration}m - {exam.numberOfQuestion} câu
          </StyledTypo>
          {/* {isMobile && <StyledTypo>Lượt LB: {exam.examTimes}</StyledTypo>} */}
          <StyledTypo>Lượt LB: {exam.examTimes}</StyledTypo>
          <Stack direction="row">
            <Rating
              name="read-only"
              value={exam.rating}
              precision={0.1}
              readOnly
              size="small"
              sx={{ mr: 0.1 }}
            />{' '}
            <StyledTypo>({exam.ratingCount})</StyledTypo>
            {exam.ratingCount > 0 && (
              <StyledTypo sx={{ ml: 1 }}>
                {' '}
                - {labels[Math.round(exam.rating)]}
              </StyledTypo>
            )}
          </Stack>

          {/* <Prize crown={false} variant="first" value={exam.price} /> */}
        </Stack>
        {/* {!isMobile && <StyledTypo>Lượt làm bài: {exam.examTimes}</StyledTypo>} */}
      </Stack>
    </StyledListItem>
  );
};

export default Exam;
