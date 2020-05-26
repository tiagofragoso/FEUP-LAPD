import React from "react";
import { Link, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

export const Disclaimers = ({ spotify, wikipedia, lyrics }) => (
    <>
        <Typography variant="body2">
            <strong>musicl</strong> does not own the content in this page.
        </Typography>
        {spotify && <SpotifyDisclaimer />}
        {wikipedia && <WikipediaDisclaimer />}
        {lyrics && <LyricsDisclaimer />}
    </>
);

const Disclaimer = ({ what, who }) =>
    <Typography variant="body2">
        {what} provided by <Link href={who.href} target="blank" rel="noopener" variant="body2" color="inherit">{who.name}</Link>.
    </Typography>;


const SpotifyDisclaimer = () =>
    <Disclaimer
        what="Musical data"
        who={{ name: "Spotify", href: "https://developer.spotify.com/documentation/web-api/reference-beta/" }}
    />;

const WikipediaDisclaimer = () =>
    <Disclaimer
        what="Information"
        who={{ name: "Wikipedia", href: "https://www.mediawiki.org/wiki/API:Main_page" }}
    />;

const LyricsDisclaimer = () =>
    <Disclaimer
        what="Lyrics"
        who={{ name: "Lyrics.ovh", href: "https://lyricsovh.docs.apiary.io/" }}
    />;

Disclaimers.propTypes = {
    spotify: PropTypes.bool,
    wikipedia: PropTypes.bool,
    lyrics: PropTypes.bool,
};

Disclaimer.propTypes = {
    what: PropTypes.string.isRequired,
    who: PropTypes.object.isRequired,
};
