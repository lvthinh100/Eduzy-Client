import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const OnlyDesktopBlock: React.FC<{ children: ReactNode }> = ({
  children,
  ...other
}) => {
  return (
    <Box {...other} sx={{ display: { md: "block", xs: "none" } }}>
      {children}
    </Box>
  );
};

export default OnlyDesktopBlock;
