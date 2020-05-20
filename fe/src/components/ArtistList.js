import React from "react";
import { Link, Typography, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";

const useStyles = makeStyles(() => ({
    artistName: {
        fontWeight: "inherit",
    },
}));

export const ArtistList = ({ artists, variant }) => {
    const classes = useStyles();

    return artists.map(({ id, name }, index) => (
        <React.Fragment key={id}>
            <Link color="inherit" to={`/artists/${id}`} underline="none" component={RouterLink}>
                <Typography className={classes.artistName} variant={variant} component="span">
                    {name}
                </Typography>
            </Link>
            {index !== artists.length - 1 ? ", " : null}
        </React.Fragment>
    ));
};

export default ArtistList;
