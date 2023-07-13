import { PaperProps, Paper, styled } from "@mui/material";

const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  borderTop: `10px solid ${theme.palette.highlighter.main}`,
  borderRadius: 0,
  padding: 5,
}));

export default PaperStyled;
