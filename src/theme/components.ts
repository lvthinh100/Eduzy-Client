import { ButtonProps } from "@mui/material";
import { Theme } from "@mui/material";

import Digital from "../assets/Fonts/digital.ttf";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

const components = {
  MuiButton: {
    variants: [
      {
        props: { variant: "gradient" } as ButtonProps,
        style: {
          backgroundImage: `linear-gradient(to right, #FCDC93, #f08ad3 75%)`,
          "&:hover": {
            opacity: "0.7",
          },
          "&:disabled": {
            backgroundImage: `linear-gradient(to right, white, gray 75%)`,
            color: "white",
          },
        },
      },
    ],
  },
  MuiDateCalendar: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        "& .MuiTypography-root": {
          fontWeight: "inherit",
          color: "inherit",
        },
        "& .MuiDayCalendar-header": {
          fontWeight: "bolder",
          color: "#bea1a6",
        },
        "& .MuiPickersDay-dayOutsideMonth": {
          fontWeight: "bolder",
          color: "#bea1a6",
          opacity: 0.8,
        },
        "& .MuiPickersDay-today": {
          backgroundColor: theme.palette.highlighter.main,
        },
      }),
    },
  },
  MuiCssBaseline: {
    styleOverrides: `
    @font-face {
      font-family: 'Digital';
      font-style: normal;
      font-display: swap;
      font-weight: 400;
      src: url(${Digital}) format('truetype');
    }
    `,
  },
};

export default components;
