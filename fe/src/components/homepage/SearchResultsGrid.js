import React from "react";
import { Grid } from "@material-ui/core";
import PropTyes from "prop-types";

import SearchResultCard from "./SearchResultCard";

export const SearchResultsGrid = ({ type, items }) => (
    <Grid container spacing={5}>
        {items.map((item, index) => (
            <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
                <SearchResultCard key={item.id} item={item} type={type} />
            </Grid>
        ))}
    </Grid>
);

SearchResultsGrid.propTypes = {
    type: PropTyes.oneOf(["artist", "album", "track"]).isRequired,
    items: PropTyes.array.isRequired,
};

export default SearchResultsGrid;
