import React from "react";
import { Icon, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link as RouterLink } from "@reach/router";
import PropTypes from "prop-types";

import { msToMinutesSeconds } from "../../utils/dateUtils";
import ArtistList from "../ArtistList";

const useStyles = makeStyles((theme) => ({
    trackCardWrapper: {
        backgroundColor: "#F3F3F3",
        width: "100%",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    trackNumber: {
        color: "rgba(68,69,69,0.5)",
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(2),
    },
    trackName: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.text.primary,
    },
    trackArtistList: {
        color: "rgba(68,69,69,0.5)",
        fontWeight: theme.typography.fontWeightBold,
        marginLeft: theme.spacing(0.5),
    },
    alignBaseline: {
        display: "flex",
        alignItems: "baseline",
    },
    trackLink: {
        display: "flex",
        alignItems: "center",
    },
}));

export const TrackCard = ({ track }) => {
    const classes = useStyles();

    return (
        <div className={classes.trackCardWrapper}>
            <div className={classes.alignBaseline}>
                <Link to={`/tracks/${track.id}`} underline="none" component={RouterLink}>
                    <Typography variant="body1" display="inline" className={classes.trackNumber}>{track.track_number}</Typography>
                    <Typography variant="body1" display="inline" className={classes.trackName}>{track.name}</Typography>
                </Link>
                {
                    track.artists.length > 1 ?
                        <div className={classes.trackArtistList}>
                            <span>- </span>
                            <ArtistList artists={track.artists.slice(1)} variant="body2" />
                        </div> :
                        null
                }
            </div>
            <div className={classes.alignBaseline}>
                <Typography variant="body1" display="inline" className={classes.trackNumber}>
                    {msToMinutesSeconds(track.duration_ms)}
                </Typography>
                <Link className={classes.trackLink} href={track.external_urls.spotify} target="_blank" rel="noopener">
                    <Icon color="primary" className="fab fa-spotify"/>
                </Link>
            </div>
        </div>
    );
};

TrackCard.propTypes = {
    track: PropTypes.object.isRequired,
};

export default TrackCard;
