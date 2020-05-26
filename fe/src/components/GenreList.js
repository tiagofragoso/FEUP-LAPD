import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    genreList: {
        display: "flex",
        color: theme.palette.text.primary,
        "& > button": {
            marginRight: theme.spacing(1),
            border: "2px solid",
            cursor: "default",
        },
    },
}));

export const GenreList = ({ genres }) => {
    const classes = useStyles();
    return (
        <div className={classes.genreList}>
            {genres.map((g, i) =>
                <Button key={i} color="inherit" variant="outlined" size="small" disableRipple disableElevation>
                    {g}
                </Button>
            )}
        </div>
    );
};

GenreList.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GenreList;
