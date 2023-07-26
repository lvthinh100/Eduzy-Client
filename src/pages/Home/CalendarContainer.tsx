import React, { ReactNode } from "react";
import PaperStyled from "./style";
import { Box } from "@mui/material";

const CalendarContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ position: "relative", mt: 2 }}>
      <Box
        sx={{
          width: "10px",
          height: "10px",
          backgroundColor: "red",
          borderRadius: "50%",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />
      <Box
        sx={{
          width: "100px",
          height: "3px",
          backgroundColor: "white",
          position: "absolute",
          transform: "rotate(20deg)",
          left: "50%",
          top: "20px",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          width: "100px",
          height: "3px",
          backgroundColor: "white",
          position: "relative",
          transform: "translateX(-100%) rotate(-20deg) ",
          left: "50%",
          top: "20px",
          zIndex: -1,
        }}
      />
      <PaperStyled elevation={8} sx={{ mt: "30px" }}>
        {children}
      </PaperStyled>
    </Box>
  );
};

export default CalendarContainer;
