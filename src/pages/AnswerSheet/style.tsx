import {
  styled,
  Box,
  BoxProps,
  Typography,
  TypographyProps,
} from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#DE5173",
  fontSize: "12px",
  border: "1px solid #DE5173",
  borderRadius: "50%",
  textAlign: "center",
  [theme.breakpoints.up("xs")]: {
    width: "22px",
    height: "22px",
    lineHeight: "22px",
  },
  [theme.breakpoints.up("md")]: {
    width: "16px",
    lineHeight: "16px",
    height: "16px",
  },
}));

export const StyledScoreLabel = styled(Typography)<TypographyProps>({
  fontSize: "38px",
  fontFamily: "HandWriting",
  color: "red",
});
