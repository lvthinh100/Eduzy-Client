import {
  Box,
  Container,
  Dialog,
  Grid,
  IconButton,
  SpeedDialAction,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AlarmIcon from '@mui/icons-material/Alarm';
import LeaderboardOutlinedIcon from '@mui/icons-material/LeaderboardOutlined';

import UpcomingEvent from './UpcomingEvent';
import Schedule from './Schedule';
import Additional from './Additional';
import CalendarContainerRight from './CalendarContainerRight';
import SelectClassType from '../../components/SelectClassType';
import { StyledSpeedial } from './style';
import Clock from '../../components/Clock';
import useToggleOpen from '../../hooks/useToggleOpen';
import LeaderBoard from '../../components/LeaderBoard';

// Data
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { appActions } from '../../redux/slices/appSlice';
import { LBEnum } from '../../model/Standard';

const HomePage = () => {
  const [openCalendar, handleOpenCalendar, handleCloseCalendar] =
    useToggleOpen(false);
  const [openClock, handleOpenClock, handleCloseClock] = useToggleOpen(false);
  const { showLeaderBoardModal } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item lg={0} md={12} xs={12}>
          <Box
            sx={{
              display: { lg: 'none', xs: 'flex' },
              justifyContent: 'space-between',
              my: 1,
            }}
          >
            <SelectClassType />
            <IconButton
              aria-label="Lịch"
              sx={{
                justifySelf: 'flex-end',
                display: { md: 'block', xs: 'none' },
              }}
              onClick={() => handleOpenCalendar()}
            >
              <CalendarMonthIcon fontSize="large" />
            </IconButton>

            <Box
              display={{ md: 'none', xs: 'block' }}
              sx={{
                color: (theme) => theme.palette.lighter.main,
                opacity: 0.6,
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <StyledSpeedial
                ariaLabel="Item"
                direction="down"
                icon={<SpeedDialIcon />}
              >
                <SpeedDialAction
                  // key={action.name}
                  icon={<CalendarMonthIcon />}
                  tooltipTitle="Lịch học"
                  onClick={handleOpenCalendar}
                />
                <SpeedDialAction
                  // key={action.name}
                  icon={<AlarmIcon />}
                  tooltipTitle="Đồng hồ"
                  onClick={handleOpenClock}
                />
                <SpeedDialAction
                  // key={action.name}
                  icon={<LeaderboardOutlinedIcon />}
                  tooltipTitle="Bảng xếp hạng"
                  onClick={() =>
                    dispatch(appActions.toggleShowLeaderBoardModal())
                  }
                />
              </StyledSpeedial>
            </Box>
          </Box>
        </Grid>
        <Grid item lg={4} md={3} xs={12}>
          <UpcomingEvent />
        </Grid>
        <Grid item lg={4} md={9}>
          <Box display={{ md: 'block', xs: 'none' }}>
            <Additional />
          </Box>
        </Grid>
        <Grid item lg={4} md={12} xs={12}>
          <Box
            sx={{
              mr: { lg: 0, md: 8, xs: 0 },
              display: { lg: 'block', md: 'none', xs: 'none' },
            }}
          >
            <CalendarContainerRight>
              <Schedule />
            </CalendarContainerRight>
          </Box>
        </Grid>
      </Grid>
      <Dialog
        maxWidth={'xs'}
        fullWidth={true}
        open={openCalendar}
        sx={{ display: { lg: 'none', xs: 'block' } }}
        onClose={() => handleCloseCalendar()}
      >
        <Schedule />
      </Dialog>
      <Dialog
        maxWidth={'xs'}
        open={openClock}
        sx={{ display: { md: 'none', xs: 'block' } }}
        onClose={() => handleCloseClock()}
      >
        <Clock />
      </Dialog>
      <Dialog
        open={showLeaderBoardModal}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        onClose={() => dispatch(appActions.toggleShowLeaderBoardModal())}
      >
        <Box>
          <LeaderBoard type={LBEnum.achievement} />
        </Box>
      </Dialog>
    </Container>
  );
};

export default HomePage;
