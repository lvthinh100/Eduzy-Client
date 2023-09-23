import React from "react";
import { Stack, Typography } from "@mui/material";
import CrownIcon from "../components/IconComponent/CrownIcon";
import { CrownVariantType } from "../model/Crown";

interface PropsType {
  quantity: number | undefined;
  variant?: CrownVariantType;
  style?: React.CSSProperties;
  fontSize?: number;
}

const Crown: React.FC<PropsType> = ({ quantity, variant, style, fontSize }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        fontSize: fontSize || "12px",
        color: (theme) => theme.palette.prize[variant || "normal"],
        ...style,
      }}
    >
      <Typography
        fontSize="inherit"
        fontFamily="ArialRounded"
        mr={0.3}
        lineHeight="14px"
      >
        {quantity ?? 0}
      </Typography>
      <CrownIcon
        sx={{ width: fontSize || 12, height: fontSize || 12 }}
        color="inherit"
      />
    </Stack>
  );
};

Crown.defaultProps = {
  variant: "normal",
  fontSize: 12,
};

export default Crown;
