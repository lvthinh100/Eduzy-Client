import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#DE5173",
  fontSize: "10px",
  border: "1px solid #DE5173",
  borderRadius: "50%",
  textAlign: "center",
  [theme.breakpoints.up("xs")]: {
    width: "20px",
    height: "20px",
    lineHeight: "20px",
  },
  [theme.breakpoints.up("md")]: {
    width: "14px",
    lineHeight: "14px",
    height: "14px",
  },
}));

export const StyledScoreLabel = styled(Typography)<TypographyProps>({
  fontSize: "36px",
  fontFamily: "HandWriting",
  color: "red",
});
