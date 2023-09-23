import React from "react";
import { Stack, Avatar, Typography } from "@mui/material";
import img from "../assets/avatar.jpg";
import Prize from "./Prize";
import { StudentLBInfo } from "../model/Student";
import { LBEnum } from "../model/Standard";
import Crown from "./Crown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface StudentInfoProps {
  studentLB: StudentLBInfo;
  type: string;
}

const StudentInfo: React.FC<StudentInfoProps> = ({ studentLB, type }) => {
  return (
    <Stack direction="column" alignItems="center">
      {/* <Avatar
        src={img}
        sx={{
          border: (theme) => `2px solid ${theme.palette.prize.first}`,
          width: "56px",
          height: "56px",
          m: "4px",
        }}
      /> */}
      <Avatar
        src={studentLB?.avatar}
        sx={{
          width: "56px",
          height: "56px",
          m: "4px",
          backgroundColor: "#fff",
        }}
      ></Avatar>
      <Typography
        fontSize="14px"
        fontFamily="SegoeUISemiBold"
        maxWidth={200}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        color="#472422"
      >
        {studentLB.fullName}
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
        <Stack direction="row" display="flex" alignItems="center" mb={0.5}>
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
