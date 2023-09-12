import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  color: "red",
  fontSize: "10px",
  border: "1px solid red",
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
  fontSize: "40px",
  fontFamily: "HandWriting",
  color: "red",
});
