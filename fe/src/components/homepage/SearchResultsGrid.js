import React, { useState } from "react";
import { Button, Grid, Typography, makeStyles } from "@material-ui/core";
import PropTyes from "prop-types";

import SearchResultCard from "./SearchResultCard";

const useStyles = makeStyles((theme) => ({
    center: {
        display: "flex",
        justifyContent: "center",
    },
    loadMoreBtn: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 2),
        backgroundColor: "#F3F3F3",
    },
}));

export const SearchResultsGrid = ({ type, items }) => {
    const classes = useStyles();

    const [resultsCount, setResultsCount] = useState(9);

    const increaseResultsCount = () => {
        setResultsCount(resultsCount + 3);
    };

    return (
        <>
            <Grid container spacing={5}>
                {items.length === 0 &&
                <Grid item xs={12} className={classes.center}>
                    <Typography variant="h6">No results</Typography>
                </Grid>
                }
                {items.slice(0, resultsCount).map((item, index) => (
                    <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                        <SearchResultCard key={item.id} item={item} type={type} />
                    </Grid>
                ))}
                {
                    (resultsCount <= items.length) &&
                    <Grid item xs={12} className={classes.center} >
                        <Button
                            size="large"
                            variant="contained"
                            disableElevation
                            disableRipple
                            className={classes.loadMoreBtn}
                            onClick={increaseResultsCount}
                        >
                            LOAD MORE RESULTS
                        </Button>
                    </Grid>
                }
            </Grid>

        </>
    );
};

SearchResultsGrid.propTypes = {
    type: PropTyes.oneOf(["artist", "album", "track"]).isRequired,
    items: PropTyes.array.isRequired,
};

export default SearchResultsGrid;
