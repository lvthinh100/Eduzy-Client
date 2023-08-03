import { ButtonProps } from "@mui/material";
import { Theme } from "@mui/material";

import Digital from "../assets/Fonts/digital.ttf";
import ArialRounded from "../assets/Fonts/ARLRDBD.ttf";
import SegoeUISemiBold from "../assets/Fonts/SegoeUI-SemiBold.ttf";
import ArialUnicodeMS from "../assets/Fonts/ArialUnicodeMS.ttf";
import HandWriting from "../assets/Fonts/Merienda-VariableFont_wght.ttf";
import Signature from "../assets/Fonts/BrothersideSignature-w13o6.otf";

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
          color: "white",
          borderRadius: "20px",
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
      @font-face {
        font-family: 'ArialRounded';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(${ArialRounded}) format('truetype');
      }
      @font-face {
        font-family: 'SegoeUISemiBold';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(${SegoeUISemiBold}) format('truetype');
      }
      @font-face {
        font-family: 'ArialUnicodeMS';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(${ArialUnicodeMS}) format('truetype');
      }
      @font-face {
        font-family: 'HandWriting';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(${HandWriting}) format('truetype');
      }
      @font-face {
        font-family: 'Signature';
        font-style: normal;
        font-display: swap;
        font-weight: 400;
        src: url(${Signature}) format('opentype');
      }
      /* width */
      ::-webkit-scrollbar {
        width: 8px;
        border-radius: 10px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        background: transparent;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: #aaaaaa;
        border-radius: 10px;
      }

      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    `,
  },
};

export default components;
