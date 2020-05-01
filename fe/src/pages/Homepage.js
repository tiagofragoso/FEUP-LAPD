import React, { useRef } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";

import SearchResult from "../components/SearchResult";
import PageLayout from "../components/PageLayout";
import SearchBar from "../components/SearchBar";
import smoothScrollToRef from "../utils/smoothScroll";

import blob from "../assets/blob.svg";
import logoWhite from "../assets/logo_white.svg";

const useStyles = makeStyles((theme) => ({
    splash: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${blob}) no-repeat center center`,
    },
    blob: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxHeight: "450px",
        height: "100%",
    },
    logo: {
        height: "30%",
        margin: theme.spacing(6, 0),
    },
}));

const HomePage = () => {

    const { results, loading, error } = useSelector((state) => state.search);

    const classes = useStyles();

    const resultsRef = useRef(null);

    const scrollToResults = () => {
        smoothScrollToRef(resultsRef);
    };

    return (
        <>
            <div className={classes.splash}>
                <div className={classes.blob}>
                    <img alt="white logo" src={logoWhite} className={classes.logo}/>
                    <SearchBar resultsScroll={scrollToResults} />
                </div>
            </div>
            <div ref={resultsRef} />
            <PageLayout>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && results &&
                    <>
                        <h2>Tracks</h2>
                        {
                            results.tracks.items.map((item) => <SearchResult key={item.id} item={item} type="track" />)
                        }
                        <h2>Artists</h2>
                        {
                            results.artists.items.map((item) => <SearchResult key={item.id} item={item} type="artist" />)
                        }
                        <h2>Albums</h2>
                        {
                            results.albums.items.map((item) => <SearchResult key={item.id} item={item} type="album" />)
                        }
                    </>
                }
            </PageLayout>
        </>
    );

};

export default HomePage;
