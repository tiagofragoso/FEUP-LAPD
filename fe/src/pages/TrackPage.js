import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../services/trackService";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";

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
            <>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && track  &&
                <PageWithHeader
                    image={track.album.images[0].url}
                    title={track.name}
                    supertitle="EP • 2016"
                    subtitle={{ album: track.album.name, artists: track.artists.map((a) => a.name) }}
                    popularity={track.popularity}
                >
                    {track.lyrics && <pre className={classes.lyrics}>{track.lyrics}</pre>}
                    {!track.lyrics && <p>Lyrics not found</p>}
                </PageWithHeader>
                }
            </>
        </PageLayout>
    );
};

export default TrackPage;
