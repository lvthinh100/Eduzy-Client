import React, { ReactNode } from "react";
import { PaperStyled } from "./style";
import { Box } from "@mui/material";

const CalendarContainerRight: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        mt: 2,
        minWidth: "350px",
        ml: { lg: 0, md: 0, xs: 0 },
        mr: { lg: 6, md: 2, xs: 0 },
      }}
    >
      <Box
        sx={{
          width: "10px",
          height: "7px",
          backgroundColor: "#C30006",
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
          backgroundColor: "#E1E6E5",
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
          backgroundColor: "#E1E6E5",
          position: "relative",
          transform: "translateX(-100%) rotate(-20deg) ",
          left: "50%",
          top: "20px",
          zIndex: -1,
        }}
      />
      <PaperStyled
        sx={{
          mt: "30px",
          boxShadow: "26px 26px 16px 4px rgba(110, 143, 148,0.76) !important",
        }}
      >
        {children}
      </PaperStyled>
    </Box>
  );
};

export default CalendarContainerRight;
