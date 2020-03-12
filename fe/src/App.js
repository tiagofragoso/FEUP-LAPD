import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./AppTheme";
import AppRouter from "./AppRouter";

const App = () => (
    <ThemeProvider theme={theme}>
        <AppRouter />
        <CssBaseline />
    </ThemeProvider>
);

export default App;
