import React, { useRef, useCallback, useEffect, useState } from "react";
import { makeStyles, Box, Button, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

import { search } from "../services/searchService";
import SearchBar from "../components/homepage/SearchBar";
import SearchResultsGrid from "../components/homepage/SearchResultsGrid";
import PageLayout from "../components/PageLayout";
import smoothScrollToRef from "../utils/smoothScroll";
import CustomTabs from "../components/CustomTabs";

import blob from "../assets/blob.svg";
import logoWhite from "../assets/logo_white.svg";
import { Disclaimers } from "../components/disclaimers/Disclaimer";

const useStyles = makeStyles((theme) => ({
    splash: {
        position: "relative",
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
    aboutContainer: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(2),
    },
}));

const HomePage = ({ location }) => {
    const { results, loading, error } = useSelector((state) => state.search);
    const classes = useStyles();
    const resultsRef = useRef(null);
    const topRef = useRef(null);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(null);

    const submitSearch = useCallback(
        (data) => {
            if (data.q.trim() !== "" && data.type.trim() !== "") {
                dispatch(search(data));
                setSearchQuery(data.q);
                setTimeout(() => {
                    scrollToResults();
                }, 300);
            }
        },
        [dispatch]
    );

    const scrollToResults = () => {
        smoothScrollToRef(resultsRef);
    };

    const scrollToTop = () => {
        smoothScrollToRef(topRef);
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.has("q")) {
            submitSearch({ q: params.get("q"), type: ["album", "artist", "track"].join(",") });
        } else {
            scrollToTop();
        }
    }, [location, submitSearch]);

    return (
        <>
            <div className={classes.splash} ref={topRef}>
                <div className={classes.blob}>
                    <img alt="white logo" src={logoWhite} className={classes.logo}/>
                    <SearchBar searchQuery={searchQuery} submitSearch={submitSearch} />
                </div>
                <div className={classes.aboutContainer}>
                    <Button to="/about" component={Link}>About</Button>
                </div>
            </div>
            <div ref={resultsRef} />
            { searchQuery &&
            <PageLayout loading={loading} error={error}>
                { results &&
                    <>
                        <Box mb={5}>
                            <Typography variant="h4" component="h4">Showing results for <strong>{searchQuery}</strong></Typography>
                        </Box>
                        <CustomTabs
                            tabs={
                                Object.keys(results).map((key) => {
                                    const items = results[key];
                                    return {
                                        label: key,
                                        items: <SearchResultsGrid items={items} type={key.slice(0, -1)} />,
                                    };
                                })
                            }
                        />
                        <Disclaimers spotify />
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
