import { styled, Box, BoxProps } from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  border: "1px solid #DE5173",
  width: "20px",
  height: "22px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#DE5173",
}));
