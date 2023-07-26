import { styled, Box, BoxProps } from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  border: "1px solid red",
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
