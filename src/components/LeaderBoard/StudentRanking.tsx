import React from "react";
import { ListItem, Box, Typography, Stack, Avatar } from "@mui/material";
import img from "../../assets/avatar.jpg";
import Prize from "../Prize";
import { StudentLBInfo } from "../../model/Student";
import { AnswerEnum, LBEnum } from "../../model/Standard";
import Crown from "../Crown";

interface StudentRankingProps {
  studentLB: StudentLBInfo;
  type: string;
  index: number;
}

const StudentRanking: React.FC<StudentRankingProps> = ({
  studentLB,
  type,
  index,
}) => {
  return (
    <ListItem sx={{ px: 0 }}>
      <Box
        sx={{
          backgroundColor:
            studentLB.type === AnswerEnum.sub
              ? "#E1E5E6" // Set background color to gray for "Sub" type
              : (theme) => theme.palette.background.darker,
          width: "100%",
          display: "flex",
          alignItems: "center",
          p: 1,
          borderRadius: 3,
        }}
      >
        <Typography fontFamily="SegoeUISemiBold" fontSize="18px" marginX={1.3}>
          {index.toString().length < 2
            ? "0" + index.toString()
            : index.toString()}
        </Typography>
        <Stack direction="row" alignItems="center" flexGrow={1}>
          <Avatar
            src={img}
            sx={{
              border: (theme) => `2px solid ${theme.palette.prize.first}`,
              width: "56px",
              height: "56px",
              m: "4px",
            }}
          />
          <Stack ml={1} justifyContent="center" alignItems="center">
            <Typography fontSize="14px" fontFamily="SegoeUISemiBold">
              {studentLB.fullName}
            </Typography>
            <Typography fontSize="12px" fontFamily="SegoeUISemiBold" mb={0.3}>
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
              <Stack direction="row" display="flex" alignItems="center">
                <Crown
                  quantity={studentLB.crowns1}
                  variant="first"
                  style={{ margin: "0px 5px" }}
                />
                <Crown
                  quantity={studentLB.crowns2}
                  variant="second"
                  style={{ margin: "0px 5px" }}
                />
                <Crown
                  quantity={studentLB.crowns3}
                  variant="third"
                  style={{ margin: "0px 5px" }}
                />
              </Stack>
            )}
          </Stack>
        </Stack>
        {type === LBEnum.score && (
          <Typography variant="subtitle2" marginX={1}>
            {studentLB.score}
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

export default StudentRanking;
