import React from "react";
import { Router } from "@reach/router";

import HomePage from "./pages/Homepage";

const AppRouter = () => (
    <Router>
        <HomePage path="/"/>
    </Router>
);

export default AppRouter;
