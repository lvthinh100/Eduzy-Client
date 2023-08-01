import React from "react";
import { Stack, Typography } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Crown from "./Crown";

import { CrownVariantType } from "../model/Crown";
import MoneyIcon from "./IconComponent/MoneyIcon";

type direction = "row" | "column";

interface PropsType {
  variant?: CrownVariantType;
  direction?: direction;
  crown?: boolean;
  value?: number;
}

const Prize: React.FC<PropsType> = ({ variant, direction, crown, value }) => {
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
        mt={0.5}
        ml={direction === "row" ? 0.5 : 0}
      >
        <Typography fontSize="inherit" lineHeight="12px" mr={0.5}>
          {value || 11000}
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
};

export default Prize;
