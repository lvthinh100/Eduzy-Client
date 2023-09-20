import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { StyledScoreLabel } from "./style";
import { ResultType } from "../../model/Lesson";

type PropsType = {
  result: ResultType | null;
  handleClose: () => void;
};

const GradeRankDialog: React.FC<PropsType & DialogProps> = ({
  result,
  handleClose,
  ...dialogProps
}) => {
  return (
    <Dialog maxWidth="sm" {...dialogProps}>
      <Paper sx={{ padding: 3, backgroundColor: "white", maxWidth: 360 }}>
        <Typography
          fontSize="30px"
          color="#39393A"
          fontFamily="SegoeUISemiBold"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Chúc mừng bạn đã hoàn thành bài thi
        </Typography>
        <Stack
          sx={{
            direction: "column",
            justifyContent: "center",
            height: "100%",
            border: "1px solid #DE5173",
            display: "flex", // Make the Stack a flex container
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              p: 1,
              textAlign: "center",
              mb: "auto",
              flex: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontFamily="Times New Roman"
              fontSize={18}
            >
              Kết quả
            </Typography>

            <Stack>
              <StyledScoreLabel>{result ? result.score : "_"}</StyledScoreLabel>
              <Stack></Stack>
            </Stack>
          </Box>
          <Divider sx={{ width: "100%", backgroundColor: "#DE5173" }} />
          <Box
            sx={{
              p: 1,
              textAlign: "center",
              mt: 1,
              flex: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontFamily="Times New Roman"
              fontSize={18}
            >
              Xếp hạng
            </Typography>

            <Stack>
              <StyledScoreLabel>{result ? result.rank : "_"}</StyledScoreLabel>
            </Stack>
          </Box>
        </Stack>
        <Button
          variant="gradient2"
          sx={{ p: 1.25, width: "100%", fontSize: "12px", mt: 4 }}
          type="submit"
          onClick={handleClose}
        >
          Đồng ý
        </Button>
      </Paper>
    </Dialog>
  );
};

export default GradeRankDialog;
