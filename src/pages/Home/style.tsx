import {
  PaperProps,
  Paper,
  styled,
  Typography,
  SpeedDial,
} from "@mui/material";

const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  borderTop: `10px solid ${theme.palette.highlighter.main}`,
  borderRadius: 0,
  padding: 5,
}));

const CustomSubtitleTypography = styled(Typography)({
  fontFamily: "SegoeUISemiBold",
  fontWeight: "800",
  fontSize: "12px",
});

const StyledSpeedial = styled(SpeedDial)(({ theme }) => ({
  position: "relative",
  "& .MuiSpeedDial-actions": {
    position: "absolute",
    bottom: -170,
  },
  "& .MuiFab-root": {
    width: "40px",
    height: "40px",
    backgroundColor: "white",
    color: theme.palette.highlightText.main,
  },
}));

export { PaperStyled, CustomSubtitleTypography, StyledSpeedial };
