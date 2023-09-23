import React from "react";
import { Stack, Typography } from "@mui/material";

import { CrownVariantType } from "../model/Crown";
import MoneyIcon from "./IconComponent/MoneyIcon";
import { formatCoins } from "../utils/coinFormat";

interface PropsType {
  variant?: CrownVariantType;
  value?: number;
}

const Coins: React.FC<PropsType> = ({ variant, value }) => {
  const formattedValue = value ? formatCoins(value) : "0";
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        fontSize: "12px",
        color: (theme) => theme.palette.prize[variant ?? "normal"],
      }}
    >
      <Typography
        fontFamily="ArialRounded"
        lineHeight="12px"
        fontSize="12px"
        mr={0.5}
      >
        {formattedValue}
        {/* {value || 11000} */}
      </Typography>
      <MoneyIcon sx={{ width: 12, height: 12 }} />
    </Stack>
  );
};

Coins.defaultProps = {
  variant: "normal",
  value: 11000,
};

export default Coins;
