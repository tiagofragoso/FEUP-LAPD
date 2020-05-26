import React from "react";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import fireIcon from "../assets/fire.svg";
import fireFadeIcon from "../assets/fire_fade.svg";
import fireFadeDarkIcon from "../assets/fire_fade_dark.svg";

const useStyles = makeStyles(() => ({
    popularityWrapper: {
        position: "relative",
        overflow: "hidden",
    },
    colored: {
        position: "absolute",
        zIndex: 5,
    },
    faded: {
        position: "absolute",
        zIndex: 0,
    },
}));

export const PopularityIcon = ({ ratio, size, background }) => {
    const classes = useStyles();
    const height = size === "small" ? 20 : 40;
    const width = size === "small" ? 15 : 30;
    const fadedIcon = background === "light" ? fireFadeIcon : fireFadeDarkIcon;

    return (
        <div className={classes.popularityWrapper} style={{ width: `${width}px`, height: `${height}px` }}>
            <div className={classes.colored} style={{ clip: `rect(${(1 - ratio) * height}px, ${height}px, ${height}px, 0px)` }}>
                <img src={fireIcon} height={`${height}px`} />
            </div>
            <div className={classes.faded}>
                <img src={fadedIcon} height={`${height}px`} />
            </div>
        </div>
    );
};

PopularityIcon.defaultProps = {
    ratio: 1,
    size: "regular",
    background: "light",
};

PopularityIcon.propTypes = {
    ratio: PropTypes.number,
    size: PropTypes.string,
    background: PropTypes.string,
};

export default PopularityIcon;
