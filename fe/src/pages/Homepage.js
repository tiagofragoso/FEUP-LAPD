import React, { useRef, useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { search } from "../services/searchService";
import SearchBar from "../components/homepage/SearchBar";
import SearchResult from "../components/homepage/SearchResult";
import PageLayout from "../components/PageLayout";
import smoothScrollToRef from "../utils/smoothScroll";
import CustomTabs from "../components/CustomTabs";

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

const HomePage = ({ location }) => {
    const { results, loading, error } = useSelector((state) => state.search);
    const classes = useStyles();
    const resultsRef = useRef(null);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(null);

    const submitSearch = useCallback(
        (data) => {
            if (data.q.trim() !== "") {
                dispatch(search(data));
                setSearchQuery(data.q);
                scrollToResults();
            }
        },
        [dispatch]
    );

    const scrollToResults = () => {
        smoothScrollToRef(resultsRef);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has("q")) {
            submitSearch({ q: params.get("q") });
        }
    }, [location, submitSearch]);

    return (
        <>
            <div className={classes.splash}>
                <div className={classes.blob}>
                    <img alt="white logo" src={logoWhite} className={classes.logo}/>
                    <SearchBar searchQuery={searchQuery} submitSearch={submitSearch} />
                </div>
            </div>
            <div ref={resultsRef} />
            { searchQuery &&
            <PageLayout>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && results &&
                    <>
                        <h2>Searched for {searchQuery}</h2>
                        <CustomTabs
                            tabs={[
                                {
                                    label: "Albums",
                                    items: results.albums.items.map((item) => <SearchResult key={item.id} item={item} type="album" />),
                                },
                                {
                                    label: "Artists",
                                    items: results.artists.items.map((item) => <SearchResult key={item.id} item={item} type="artist" />),
                                },
                                {
                                    label: "Tracks",
                                    items: results.tracks.items.map((item) => <SearchResult key={item.id} item={item} type="track" />),
                                },
                            ]}
                        />
                    </>
                }
            </PageLayout>
            }
        </>
    );
};

HomePage.propTypes = {
    location: PropTypes.object,
};

export default HomePage;
