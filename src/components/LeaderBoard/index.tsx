import React from "react";
import { Box, Paper, Typography, Stack, List, InputBase } from "@mui/material";
import StudentInfo from "../StudentInfo";
import { StandingBox, StyledBadge } from "../../pages/Exams/style";
import StudentRanking from "./StudentRanking";
import SearchIcon from "@mui/icons-material/Search";
import landscape from "../../assets/landscape.jpg";
import Prize from "../Prize";

const LeaderBoard = () => {
  return (
    <Paper
      sx={{
        textAlign: "center",
        m: 2,
        mb: 1,
        backgroundImage: `url(${landscape})`,
        backgroundSize: "550px 400px",
        borderRadius: 5,
        boxShadow: "26px 26px 16px 4px rgba(110, 143, 148,0.76) !important",
      }}
      elevation={5}
    >
      <Typography variant="h4" >Bảng Xếp Hạng</Typography>
      <Typography variant="subtitle2">Đề thi chính thức năm 2021</Typography>

      {/* Leader board */}
      <Box sx={{ position: "relative", width: "100%", height: "300px", zIndex: 0 }}>
        <Box
          sx={{
            left: "50%",
            transform: "translateX(-50%)",
            top: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
          }}
        >
          <StyledBadge color="secondary" badgeContent="1" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Prize direction="row" variant="first" />
              <Typography variant="subtitle2" >8.5</Typography>
            </Stack>
          </StyledBadge>
          <StandingBox
            sx={{
              backgroundColor: "#606d54",
              height: "140px",
            }}
          >
            1
          </StandingBox>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "20%",
            top: "20%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledBadge color="secondary" badgeContent="2" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Prize direction="row" variant="second" />

              <Typography variant="subtitle2">8.5</Typography>
            </Stack>
          </StyledBadge>
          <StandingBox
            sx={{
              backgroundColor: "#a9593d",
              height: "120px",
            }}
          >
            2
          </StandingBox>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "80%",
            top: "25%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <StyledBadge color="secondary" badgeContent="3" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Prize direction="row" variant="third" />

              <Typography variant="subtitle2">8.5</Typography>
            </Stack>
          </StyledBadge>
          <StandingBox
            sx={{
              backgroundColor: "#da8100",
              height: "80px",
            }}
          >
            3
          </StandingBox>
        </Box>
      </Box>

      {/* bottom leader board */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "30px",
          mt: -4,
          p: 2,
          zIndex: 1,
          position: "relative"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            backgroundColor: (theme) => `${theme.palette.background.darker}`,
            borderRadius: 4,
          }}
        >
          <SearchIcon sx={{
              fontSize: 18,
              color: "#A4A4A4",
            }}/>
          <InputBase placeholder="Số báo danh" sx={{ width: "100%", ml: 1, fontSize:"14px" }} />
        </Box>
        <List
          sx={{
            borderRadius: 2,
            py: 1,
            maxHeight: "300px",
            overflowY: "scroll",
            pr: 1,
          }}
        >
          <StudentRanking />
          <StudentRanking />
          <StudentRanking />
          <StudentRanking />
        </List>
      </Box>
    </Paper>
  );
};

export default LeaderBoard;
