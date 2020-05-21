import React from "react";
import { Router } from "@reach/router";

import HomePage from "./pages/Homepage";
import TrackPage from "./pages/TrackPage";
import AlbumPage from "./pages/AlbumPage";
import ArtistPage from "./pages/ArtistPage";
import AboutPage from "./pages/AboutPage";

const AppRouter = () => (
    <Router>
        <HomePage path="/"/>
        <AboutPage path="/about" />
        <TrackPage path="/tracks/:id" />
        <AlbumPage path="/albums/:id" />
        <ArtistPage path="/artists/:id" />
    </Router>
);

export default AppRouter;
