import { ButtonProps } from "@mui/material";
import { Theme } from "@mui/material";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true;
  }
}

const components = {
  MuiButtonBase: {
    defaultProps: {
      // The props to change the default for.
      disableRipple: true, // No more ripple, on the whole application 💣!
    },
  },
  MuiButton: {
    variants: [
      {
        props: { variant: "gradient" } as ButtonProps,
        style: {
          backgroundImage: `linear-gradient(to right, #FCDC93, #f08ad3 75%)`,
          "&:hover": {
            opacity: "0.7",
          },
        },
      },
    ],
  },
  MuiDateCalendar: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        maxHeight: 320,
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
};

export default components;
