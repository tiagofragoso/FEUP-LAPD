import React from "react";
import { Link } from "@reach/router";
import { Card, CardMedia, Button, CardContent, Typography, CardActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import trackPlaceholder from "../../assets/track_placeholder.png";

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

const getImage = (item, type) => {
    const imgArray = type !== "track" ? item.images : item.album.images;
    if (imgArray.length) {
        return imgArray[0].url;
    } else {
        return trackPlaceholder;
    }
};


export const SearchResult = ({ item, type }) => {
    const classes = useStyles();
    const imageUrl = getImage(item, type);
    return (
        <Card className={classes.card} raised>
            <CardMedia className={classes.cover} image={imageUrl} />
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
