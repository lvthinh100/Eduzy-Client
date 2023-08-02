import React from "react";
import { Stack, Typography } from "@mui/material";
import CrownIcon from "../components/IconComponent/CrownIcon";
import { CrownVariantType } from "../model/Crown";

interface PropsType {
  quantity: number;
  variant?: CrownVariantType;
}

const Crown: React.FC<PropsType> = ({ quantity, variant }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        fontSize: "12px",
        color: (theme) => theme.palette.prize[variant || "normal"],
      }}
    >
      <Typography fontSize="inherit" fontFamily="ArialRounded" mr={0.3} lineHeight="14px">
        {quantity}
      </Typography>
      <CrownIcon sx={{ width: 12, height: 12 }} color="inherit" />
    </Stack>
  );
};

Crown.defaultProps = {
  variant: "normal",
};

export default Crown;
