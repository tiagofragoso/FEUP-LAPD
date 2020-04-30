import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../services/trackService";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import PageLayout from "../components/PageLayout";

const useStyles = makeStyles((theme) => ({
    lyrics: {
        fontFamily: theme.typography.fontFamily,
    },
}));

export const TrackPage = ({ id }) => {

    const dispatch = useDispatch();
    const { track, loading, error } = useSelector((state) => state.track);
    useEffect(() => {
        dispatch(getTrack(id));
    }, [dispatch, id]);

    const classes = useStyles();

    return (
        <PageLayout>
            <div>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && track  &&
                <>
                    <Typography component="h3" variant="h3">
                        {track.name}
                    </Typography>
                    <Typography component="h5" variant="h5">
                        {track.artists.map((a) => a.name).toString()}
                    </Typography>
                    {track.lyrics && <pre className={classes.lyrics}>{track.lyrics}</pre>}
                    {!track.lyrics && <p>Lyrics not found</p>}
                </>
                }
            </div>
        </PageLayout>
    );
};

export default TrackPage;
