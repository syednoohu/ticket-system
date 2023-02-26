import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { themeSettings } from "./themeB";
import { useSelector } from "react-redux";
import AppRoutes from "./components/AppRoutes"

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes/>
      </ThemeProvider>
    </div>
  );
}

export default App;
