import { ButtonProps } from "@mui/material";

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
};

export default components;
