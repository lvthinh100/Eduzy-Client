import React from 'react';
import { Stack, Avatar, Typography } from '@mui/material';
import Prize from './Prize';
import { StudentLBInfo } from '../model/Student';
import { LBEnum } from '../model/Standard';
import Crown from './Crown';
import useResponsive from '../hooks/useResponsive';
import Coins from './Coins';

interface StudentInfoProps {
  studentLB: StudentLBInfo;
  type: string;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ studentLB, type }) => {
  const isMobile = useResponsive('down', 'sm');
  const studentNameLabel = isMobile
    ? studentLB.fullName.split(' ').slice(-2).join(' ')
    : studentLB.fullName;
  const crownFontSize = isMobile ? 10 : undefined;

  return (
    <Stack direction="column" alignItems="center">
      <Avatar
        src={studentLB?.avatar}
        sx={{
          width: { md: '56px', sm: '40px' },
          height: { md: '56px', sm: '40px' },
          m: '4px',
          backgroundColor: '#fff',
        }}
      ></Avatar>
      <Typography
        fontSize="12px"
        fontFamily="SegoeUISemiBold"
        maxWidth={200}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color="#472422"
      >
        {studentNameLabel}
      </Typography>
      <Typography fontSize="10px" fontFamily="SegoeUISemiBold" color="#472422">
        #{studentLB.studentCode}
      </Typography>
      {studentLB.crowns1 > 0 && type === LBEnum.score && (
        <Prize direction="row" variant="first" value={studentLB.coins} />
      )}
      {studentLB.crowns2 > 0 && type === LBEnum.score && (
        <Prize direction="row" variant="second" value={studentLB.coins} />
      )}
      {studentLB.crowns3 > 0 && type === LBEnum.score && (
        <Prize direction="row" variant="third" value={studentLB.coins} />
      )}
      {type === LBEnum.achievement && (
        <Stack direction="column" display="flex" alignItems="center" mb={0.5}>
          <Stack direction="row" display="flex" alignItems="center" mb={0.5}>
            <Crown
              fontSize={crownFontSize}
              quantity={studentLB.crowns1}
              variant="first"
              style={{ margin: '0px 5px' }}
            />
            <Crown
              fontSize={crownFontSize}
              quantity={studentLB.crowns2}
              variant="second"
              style={{ margin: '0px 5px' }}
            />
            <Crown
              fontSize={crownFontSize}
              quantity={studentLB.crowns3}
              variant="third"
              style={{ margin: '0px 5px' }}
            />
          </Stack>

          <Coins
            fontSize={crownFontSize}
            value={studentLB.coins}
            variant="first"
            style={{ marginLeft: '10px' }}
          />
        </Stack>
      )}
      {type === LBEnum.score && (
        <Typography
          variant="subtitle2"
          fontFamily="HandWriting"
          color="#472422"
        >
          {studentLB.score}
        </Typography>
      )}
    </Stack>
  );
};

export default StudentInfo;
