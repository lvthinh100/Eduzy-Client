import React, { useEffect, useRef, useState } from "react";
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

  const [searchInput, setSearchInput] = useState<string>("");
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    // Find the index of the first student that meets the filter
    const firstMatchIndex = studentLBs
      ?.slice(3)
      ?.findIndex(
        (studentLB) =>
          studentLB.fullName.includes(inputValue) ||
          studentLB.studentCode.includes(inputValue)
      );

    // If a match is found, scroll to the corresponding StudentRanking component
    if (
      firstMatchIndex !== undefined &&
      firstMatchIndex !== -1 &&
      listRef.current
    ) {
      const studentRankingItem = listRef.current.children[firstMatchIndex];
      studentRankingItem.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchData = async (req: LBReqType) => {
      try {
        const { data: response } = await getStudentLBs(req);
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
        backgroundImage: `url(${landscape})`,
        backgroundSize: "750px 400px",
        backgroundPosition: "center top",
        borderRadius: 5,
        color: "#472422",
        ...paperStyle,
      }}
      elevation={5}
    >
      <Typography variant="h4">BẢNG XẾP HẠNG</Typography>
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
            <Stack direction="column" alignItems="center">
              <StudentInfo studentLB={studentLBs[0]} type={type} />
            </Stack>
            <StandingBox
              sx={{
                backgroundColor: "#606d54",
                height: "140px",
                width: {
                  md: "90px",
                  sm: "75px",
                },
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
            {/* <StyledBadge color="secondary" badgeContent="2" overlap="circular">

            </StyledBadge> */}
            <Stack direction="column" alignItems="center">
              <StudentInfo studentLB={studentLBs[1]} type={type} />
            </Stack>
            <StandingBox
              sx={{
                backgroundColor: "#a9593d",
                height: "140px",
                width: {
                  md: "90px",
                  sm: "75px",
                },
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
            {/* <StyledBadge color="secondary" badgeContent="3" overlap="circular">

            </StyledBadge> */}
            <Stack direction="column" alignItems="center">
              <StudentInfo studentLB={studentLBs[2]} type={type} />
            </Stack>
            <StandingBox
              sx={{
                backgroundColor: "#da8100",
                height: "140px",
                width: {
                  md: "90px",
                  sm: "75px",
                },
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
            placeholder="Số báo danh/Tên"
            sx={{ width: "100%", ml: 1, fontSize: "14px" }}
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </Box>
        <List
          ref={listRef}
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
