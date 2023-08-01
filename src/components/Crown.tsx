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
        fontSize: "14px",
        color: (theme) => theme.palette.prize[variant || "normal"],
      }}
    >
      <Typography fontSize="inherit" mr={0.3} lineHeight="14px">
        {quantity}
      </Typography>
      <CrownIcon sx={{ width: 14, height: 14 }} color="inherit" />
    </Stack>
  );
};

Crown.defaultProps = {
  variant: "normal",
};

export default Crown;
