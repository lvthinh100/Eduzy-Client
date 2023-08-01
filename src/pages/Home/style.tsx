import { PaperProps, Paper, styled, Typography } from "@mui/material";

const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  borderTop: `10px solid ${theme.palette.highlighter.main}`,
  borderRadius: 0,
  padding: 5,
}));

const CustomSubtitleTypography = styled(Typography)({
  fontFamily: "Segoe UI",
  fontWeight: "600",
  fontSize: "12px"
});

export { PaperStyled, CustomSubtitleTypography };
