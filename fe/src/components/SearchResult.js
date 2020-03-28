import React from "react";
import { Link } from "@reach/router";
import { Card, CardMedia, Button, CardContent, Typography, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import trackPlaceholder from "../assets/track_placeholder.png";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    cover: {
        height: "160px",
        width: "160px",
    },
    card: {
        display: "flex",
        marginBottom: theme.spacing(2),
        width: "640px",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
}));


export const SearchResult = ({ item, type }) => {
    const classes = useStyles();
    // const coverUrl = item.images[0] ? item.images[0].url : trackPlaceholder;
    const coverUrl = type !== "track" ? item.images[0].url : item.album.images[0].url;

    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cover} image={coverUrl} />
            <CardContent className={classes.details}>
                <Typography component="h5" variant="h5">
                    {item.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Button to={`/${type}s/${item.id}`} color="primary" component={Link}>
                    see more
                </Button>
            </CardActions>
        </Card>
    );
};

SearchResult.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.oneOf(["artist", "album", "track"]).isRequired,
};

export default SearchResult;
