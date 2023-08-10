import React from "react";
import { Stack, Typography } from "@mui/material";
import Crown from "./Crown";

import { CrownVariantType } from "../model/Crown";
import MoneyIcon from "./IconComponent/MoneyIcon";
import { formatCoins } from "../utils/coinFormat";

type direction = "row" | "column";

interface PropsType {
  variant?: CrownVariantType;
  direction?: direction;
  crown?: boolean;
  value?: number;
}

const Prize: React.FC<PropsType> = ({ variant, direction, crown, value }) => {
  const formattedValue = value ? formatCoins(value) : "11.000";

  return (
    <Stack
      sx={{
        fontSize: "12px",
        color: (theme) => theme.palette.prize[variant ?? "normal"],
      }}
      alignItems="center"
      direction={direction}
    >
      {crown && <Crown quantity={1} variant={variant} />}
      <Stack
        direction="row"
        alignItems="center"
        ml={direction === "row" ? 0.5 : 0}
        mt={direction === "column" && crown ? 1 : 0}
      >
        <Typography
          fontSize="inherit"
          fontFamily="ArialRounded"
          lineHeight="12px"
          mr={0.5}
        >
          {formattedValue}
          {/* {value || 11000} */}
        </Typography>
        <MoneyIcon sx={{ width: 12, height: 12 }} />
      </Stack>
    </Stack>
  );
};

Prize.defaultProps = {
  crown: true,
  direction: "column",
  variant: "normal",
  value: 11000,
};

export default Prize;
