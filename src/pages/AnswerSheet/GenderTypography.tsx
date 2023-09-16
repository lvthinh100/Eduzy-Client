import React from "react";
import Typography from "@mui/material/Typography";

interface GenderTypographyProps {
  isMale: boolean; // Replace with your gender detection logic
}

const GenderTypography: React.FC<GenderTypographyProps> = ({ isMale }) => {
  return (
    <div>
      <Typography
        variant="subtitle2"
        fontFamily="Times New Roman"
        fontSize={18}
      >
        {isMale ? (
          <>
            <span>(Nam/</span>
            <span
              style={{
                textDecoration: "line-through",
                textDecorationColor: "#4845C4",
              }}
            >
              Nữ
            </span>
            <span>)</span>
          </>
        ) : (
          <>
            <span>(</span>
            <span
              style={{
                textDecoration: "line-through",
                textDecorationColor: "#4845C4",
              }}
            >
              Nam
            </span>
            <span>/Nữ)</span>
          </>
        )}
      </Typography>
    </div>
  );
};

export default GenderTypography;
