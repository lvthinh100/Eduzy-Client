import React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  List,
  ListItem,
  InputBase,
} from "@mui/material";
import StudentInfo from "../../components/StudentInfo";
import { StyledBadge } from "./style";
import StudentRanking from "./StudentRanking";
import SearchIcon from "@mui/icons-material/Search";
const LeaderBoard = () => {
  return (
    <Paper
      sx={{
        textAlign: "center",
        m: 2,
        backgroundImage: (theme) => `${theme.palette.gradient.light}`,
      }}
      elevation={5}
    >
      <Typography variant="h4">Bảng Xếp Hạng</Typography>
      <Typography variant="subtitle2">Đề thi chính thức năm 2021</Typography>

      {/* Leader board */}
      <Box sx={{ position: "relative", width: "100%", height: "200px" }}>
        <Box
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <StyledBadge color="secondary" badgeContent="1" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Typography fontWeight="bold">8.5</Typography>
            </Stack>
          </StyledBadge>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "25%",
            transform: "translateX(-50%)",
            top: "30%",
          }}
        >
          <StyledBadge color="secondary" badgeContent="2" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Typography fontWeight="bold">8.5</Typography>
            </Stack>
          </StyledBadge>
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: "75%",
            transform: "translateX(-50%)",
            top: "30%",
          }}
        >
          <StyledBadge color="secondary" badgeContent="3" overlap="circular">
            <Stack direction="column" alignItems="center">
              <StudentInfo />
              <Typography fontWeight="bold">8.5</Typography>
            </Stack>
          </StyledBadge>
        </Box>
      </Box>

      {/* bottom leader board */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "30px 30px 0 0",
          mt: 3,
          my: 1,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 1,
            backgroundColor: (theme) => `${theme.palette.background.darker}`,
            borderRadius: 2,
          }}
        >
          <SearchIcon />
          <InputBase placeholder="Số báo danh" sx={{ width: "100%" }} />
        </Box>
        <List
          sx={{
            borderRadius: 2,
            py: 1,
            maxHeight: "300px",
            overflowY: "scroll",
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
