import React from "react";
import { Router } from "@reach/router";

import HomePage from "./pages/Homepage";
import TrackPage from "./pages/TrackPage";

const AppRouter = () => (
    <Router>
        <HomePage path="/"/>
        <TrackPage path="/tracks/:id" />
    </Router>
);

export default AppRouter;
