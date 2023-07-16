import { CssBaseline } from "@mui/material";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { useMemo } from "react";

import palette from "./palette";
import typography from "./typography";
import components from "./components";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const themeOptions = useMemo(
    () => ({
      palette,
      typography,
      components,
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
