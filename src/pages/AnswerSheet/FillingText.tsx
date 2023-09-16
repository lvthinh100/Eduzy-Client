import React from "react";
import { Stack, Typography, SxProps } from "@mui/material";

type PropsType = {
  label: string;
  text: string;
  sx?: SxProps;
  paddingLeft?: number;
  width?: string;
  fontFamily?: string;
};

const FillingText: React.FC<PropsType> = ({
  label,
  text,
  sx,
  paddingLeft,
  width,
  fontFamily,
}) => {
  const signatureStyle = {
    fontSize: "20px",
    fontWeight: "bolder",
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={sx}
    >
      <Typography
        variant="subtitle2"
        fontFamily="Times New Roman"
        fontSize={18}
        mr={1}
      >
        {label}:
      </Typography>
      <Typography
        sx={{
          display: "block",
          minWidth: "150px",
          borderBottom: "2px dotted black",
          lineHeight: "12px",
          color: "#4845C4",
          ...(fontFamily === "Signature" && signatureStyle),
        }}
        pl={paddingLeft}
        width={width}
        flex={1}
        fontFamily={fontFamily}
      >
        {text}
      </Typography>
    </Stack>
  );
};

FillingText.defaultProps = {
  fontFamily: "HandWriting",
};

export default FillingText;
