import React from "react";
import { Router } from "@reach/router";

import HomePage from "./pages/Homepage";
import TrackPage from "./pages/TrackPage";
import AlbumPage from "./pages/AlbumPage";

const AppRouter = () => (
    <Router>
        <HomePage path="/"/>
        <TrackPage path="/tracks/:id" />
        <AlbumPage path="/albums/:id" />
    </Router>
);

export default AppRouter;
