import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  List,
  InputBase,
  SxProps,
} from "@mui/material";
import StudentInfo from "../StudentInfo";
import { StandingBox, StyledBadge } from "../../pages/Exams/style";
import StudentRanking from "./StudentRanking";
import SearchIcon from "@mui/icons-material/Search";
import landscape from "../../assets/landscape.jpg";
import { getStudentLBs } from "../../api";
import { appActions } from "../../redux/slices/appSlice";
import { useAppDispatch } from "../../hooks/redux";
import { LBReqType } from "../../model/Exam";
import { LBEnum } from "../../model/Standard";
import { StudentLBInfo } from "../../model/Student";

interface LeaderBoardStyleProps {
  type: string;
  paperStyle?: SxProps;
  examId?: string;
  examName?: string;
}

const LeaderBoard: React.FC<LeaderBoardStyleProps> = ({
  paperStyle,
  type,
  examId,
  examName,
}) => {
  const dispatch = useAppDispatch();
  const [studentLBs, setStudentLBs] = useState<StudentLBInfo[] | null>(null);
  useEffect(() => {
    const fetchData = async (req: LBReqType) => {
      try {
        console.log("req", req);
        const { data: response } = await getStudentLBs(req);
        console.log("response", response);
        setStudentLBs(response);
      } catch (err) {
        console.log(err);
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Lỗi khi fetch leader board",
          })
        );
      }
    };

    if (type) {
      if (examId) {
        fetchData({ type, examId });
      } else {
        fetchData({ type });
      }
    }
  }, [type, examId, dispatch]);

  return (
    <Paper
      sx={{
        textAlign: "center",
        mb: 1,
        backgroundImage: `url(${landscape})`,
        backgroundSize: "750px 400px",
        backgroundPosition: "center top",
        borderRadius: 5,

        ...paperStyle,
      }}
      elevation={5}
    >
      <Typography variant="h4">Bảng Xếp Hạng</Typography>
      {type === LBEnum.achievement ? (
        <Typography variant="subtitle2">Thành tích</Typography>
      ) : (
        <Typography variant="subtitle2">{examName}</Typography>
      )}

      {/* Leader board */}
      <Box
        sx={{ position: "relative", width: "100%", height: "300px", zIndex: 0 }}
      >
        {studentLBs?.[0] && (
          <Box
            sx={{
              left: "50%",
              transform: "translateX(-50%)",
              top: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <StyledBadge color="secondary" badgeContent="1" overlap="circular">
              <Stack direction="column" alignItems="center">
                <StudentInfo studentLB={studentLBs[0]} type={type} />
              </Stack>
            </StyledBadge>
            <StandingBox
              sx={{
                backgroundColor: "#606d54",
                fontFamily: "SegoeUISemiBold",
                height: "140px",
                width: "90px",
              }}
            >
              1
            </StandingBox>
          </Box>
        )}
        {studentLBs?.[1] && (
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
                <StudentInfo studentLB={studentLBs[1]} type={type} />
              </Stack>
            </StyledBadge>

            <StandingBox
              sx={{
                backgroundColor: "#a9593d",
                fontFamily: "SegoeUISemiBold",
                height: "120px",
                width: "90px",
              }}
            >
              2
            </StandingBox>
          </Box>
        )}
        {studentLBs?.[2] && (
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
                <StudentInfo studentLB={studentLBs[2]} type={type} />
              </Stack>
            </StyledBadge>
            <StandingBox
              sx={{
                backgroundColor: "#da8100",
                fontFamily: "SegoeUISemiBold",
                height: "80px",
                width: "90px",
              }}
            >
              3
            </StandingBox>
          </Box>
        )}
      </Box>

      {/* bottom leader board */}
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "30px",
          mt: -4,
          p: 2,
          zIndex: 1,
          position: "relative",
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
          <SearchIcon
            sx={{
              fontSize: 18,
              color: "#A4A4A4",
            }}
          />
          <InputBase
            placeholder="Số báo danh"
            sx={{ width: "100%", ml: 1, fontSize: "14px" }}
          />
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
          {studentLBs?.slice(3).map((studentLB, index) => (
            <StudentRanking
              key={index}
              index={index + 4}
              studentLB={studentLB}
              type={type}
            />
          ))}
        </List>
      </Box>
    </Paper>
  );
};

export default LeaderBoard;
