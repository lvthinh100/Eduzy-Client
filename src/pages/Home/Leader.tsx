import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Badge,
  Typography,
  Stack,
  CardMedia,
} from '@mui/material';
import Crown from '../../components/Crown';
import computer from '../../assets/computer.jpg';
import leaderboardBtn from '../../assets/leaderboardBtn.png';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../../hooks/redux';
import { appActions } from '../../redux/slices/appSlice';
import { getStudentLBs } from '../../api';
import { LBReqType } from '../../model/Exam';
import { StudentLBInfo } from '../../model/Student';
import { LBEnum } from '../../model/Standard';
import Coins from '../../components/Coins';

const Leader = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(appActions.toggleShowLeaderBoardModal());
  };
  const [studentLB, setStudentLB] = useState<StudentLBInfo | null>(null);
  useEffect(() => {
    const fetchData = async (req: LBReqType) => {
      try {
        const { data: response } = await getStudentLBs(req);
        const studentLBs: StudentLBInfo[] = response;
        if (studentLBs.length > 0) setStudentLB(studentLBs[0]);
      } catch (err) {
        console.log(err);
        dispatch(
          appActions.showNotification({
            variant: 'success',
            message: 'Lỗi khi fetch leader board',
          })
        );
      }
    };

    fetchData({ type: LBEnum.achievement });
  }, [dispatch]);
  return (
    <Box
      sx={{
        position: 'relative',
        width: { md: '300px', xs: '500px' },
        mt: { md: 5, xs: 1 },
        mr: { lg: 5, md: 0, xs: 0 },
        height: 300,
        zIndex: 1,
      }}
    >
      <Box
        component={Stack}
        direction="column"
        alignItems="center"
        sx={{
          width: '200px',
          position: 'absolute',
          zIndex: 1,
          right: { md: -50, xs: 150 },
          top: 45,
        }}
      >
        <Box
          sx={{
            borderRadius: '50%',
            border: (theme) => `3px solid ${theme.palette.prize.first}`,
          }}
        >
          <Badge
            badgeContent="1"
            overlap="circular"
            sx={{
              '& .MuiBadge-badge': { backgroundColor: 'prize.first' },
            }}
          >
            <Avatar
              src={studentLB?.avatar}
              sx={{
                width: '40px',
                height: '40px',
                m: '4px',
                backgroundColor: '#fff',
              }}
            ></Avatar>
          </Badge>
        </Box>
        <Typography
          component={motion.span}
          fontWeight="bold"
          sx={{
            color: 'transparent',
            backgroundImage: 'linear-gradient(180deg, white, #fdbd24 75%);',
            WebkitBackgroundClip: 'text',
            backgroundSize: '250% 250%',
            WebkitBackgroundSize: '250% 250%',
            fontFamily: 'OswaldSemiBold',
            fontSize: '14px',
            m: 0,
          }}
          animate={{
            backgroundPosition: ['0 100%', '0 -100%', '0 100%'],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 3 }}
        >
          {studentLB?.fullName}
        </Typography>
        <Typography
          fontWeight="500"
          fontSize={12}
          sx={{ color: 'prize.first' }}
        >
          #{studentLB?.studentCode}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1} mt={0.2}>
          <Crown quantity={studentLB?.crowns1} variant="first" />
          <Crown quantity={studentLB?.crowns2} variant="second" />
          <Crown quantity={studentLB?.crowns3} variant="third" />
          <Coins value={studentLB?.coins} variant="first" />
        </Stack>
      </Box>
      <CardMedia
        component="img"
        alt="leader board"
        src={leaderboardBtn}
        sx={{
          position: 'absolute',
          width: 60,
          top: 80,
          left: { md: 100, xs: 115 },
          zIndex: 10,
          '&:hover': {
            opacity: 0.6,
            cursor: 'pointer',
          },
        }}
        onClick={handleClick}
      />
      <CardMedia
        component="img"
        alt="computer"
        src={computer}
        sx={{
          position: 'absolute',
          width: 500,
          right: { md: -180, xs: 0 },
        }}
      />
    </Box>
  );
};

export default Leader;
