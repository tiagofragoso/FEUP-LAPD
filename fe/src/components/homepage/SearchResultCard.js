import React from "react";
import { Link as RouterLink } from "@reach/router";
import { Card, CardMedia, CardContent, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { headerFontFamily } from "../../AppTheme";
import getImage from "../../utils/getImage";


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
    cardTitle: {
        fontFamily: headerFontFamily.join(","),
        fontWeight: theme.typography.fontWeightBold,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
}));


export const SearchResultCard = ({ item, type }) => {
    const classes = useStyles();
    const imageUrl = getImage(item, type);
    return (
        <Link to={`/${type}s/${item.id}`} underline="none" component={RouterLink}>
            <Card classes={{ root: classes.card }}>
                <CardMedia className={classes.cover} image={imageUrl} />
                <CardContent>
                    <Typography className={classes.cardTitle} variant="body1">{item.name}</Typography>
                    { (type === "album" || type === "track") &&
                        <Typography variant="body2">
                            {`${item.artists[0].name}${item.artists.length > 1 ? `, ${item.artists.length - 1} more` : ""}`}
                        </Typography>
                    }
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
