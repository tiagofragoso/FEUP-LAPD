import React from "react";
import { Router } from "@reach/router";

import HomePage from "./pages/Homepage";
import TrackPage from "./pages/TrackPage";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";

const AppRouter = () => (
    <Router>
        <HomePage path="/"/>
        <TrackPage path="/tracks/:id" />
        <AlbumPage path="/albums/:id" />
        <ArtistPage path="/artists/:id" />
    </Router>
);

export default AppRouter;
