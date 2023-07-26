import { styled, Box, BoxProps } from "@mui/material";

export const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
  width: "14px",
  height: "14px",
  color: "red",
  fontSize: "10px",
  border: "1px solid red",
  lineHeight: "14px",
  borderRadius: "50%",
  textAlign: "center",
}));
