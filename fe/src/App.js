import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./AppTheme";
import AppRouter from "./AppRouter";
import configureStore from "./configureStore";

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <AppRouter />
            <CssBaseline />
        </ThemeProvider>
    </Provider>
);

export default App;
