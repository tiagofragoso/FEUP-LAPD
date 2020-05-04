import React from "react";
import { Link as RouterLink } from "@reach/router";
import { Card, CardMedia, CardContent, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { headerFontFamily } from "../../AppTheme";

import trackPlaceholder from "../../assets/track_placeholder.png";


const useStyles = makeStyles((theme) => ({
    cover: {
        height: "100%",
        width: "128px",
        flexShrink: 0,
    },
    card: {
        display: "flex",
        width: "100%",
        height: "128px",
        backgroundColor: "#F3F3F3",
        boxShadow: "none",
    },
    details: {
        fontFamily: headerFontFamily.join(","),
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightBold,
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


export const SearchResultCard = ({ item, type }) => {
    const classes = useStyles();
    const imageUrl = getImage(item, type);
    return (
        <Link to={`/${type}s/${item.id}`} underline="none" component={RouterLink}>
            <Card classes={{ root: classes.card }}>
                <CardMedia className={classes.cover} image={imageUrl} />
                <CardContent classes={{ root: classes.details }}>
                    {item.name}
                </CardContent>
            </Card>
        </Link>
    );
};

SearchResultCard.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.oneOf(["artist", "album", "track"]).isRequired,
};

export default SearchResultCard;
