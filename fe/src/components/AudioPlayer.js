import React, { useState, useEffect } from "react";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import PropTypes from "prop-types";

import { secondsToMinutesSeconds } from "../utils/dateUtils";

const useStyles = makeStyles((theme) => ({
    playerWrapper: {
        border: "2px solid rgba(68,68,69,0.5)",
        borderRadius: "70px",
        color: "rgba(68,68,69,0.5)",
        paddingRight: theme.spacing(0.8),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    iconButtonRoot: {
        padding: 0,
    },
}));

export const AudioPlayer = ({ url }) => {
    const classes = useStyles();

    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);
    audio.volume = 0.3;

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        if (playing) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [playing, audio]);

    useEffect(() => {
        audio.addEventListener("ended", () => {
            setPlaying(false);
            setTime(0);
        });
        audio.addEventListener("timeupdate", () => setTime(audio.currentTime));
        audio.addEventListener("durationchange", () => setDuration(audio.duration));
        return () => {
            audio.removeEventListener("ended", () => {
                setPlaying(false);
                setTime(0);
            });
        };
    }, [audio]);

    return (
        <div className={classes.playerWrapper}>
            <IconButton size="small" color="inherit" classes={{ root: classes.iconButtonRoot }} disableRipple onClick={toggle}>
                {playing ? <PauseCircleFilledIcon /> : <PlayCircleFilledIcon />}
            </IconButton>
            <small><strong>{secondsToMinutesSeconds(duration - time)}</strong></small>
        </div>
    );
};

AudioPlayer.propTypes = {
    url: PropTypes.string.isRequired,
};

export default AudioPlayer;
