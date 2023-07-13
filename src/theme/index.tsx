import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";

import palette from "./palette";
import typography from "./typography";
// import shadows from "./shadows";
// import ComponentOverrides from "./overrides";

declare module "@mui/material/styles" {
  interface Palette {
    lighter: Palette["primary"];
    highlighter: Palette["primary"];
    prize: {
      first: string;
      second: string;
      third: string;
    };
  }
  // allow configuration using `createTheme`
}

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      //   shadows: shadows,
      shape: { borderRadius: 8 },
    }),
    []
  );
  const theme = createTheme(themeOptions);
  //   theme.components = ComponentOverrides(theme);
  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
