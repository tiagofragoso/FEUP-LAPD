import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../services/trackService";
import { makeStyles } from "@material-ui/styles";
import { Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";
import PageSection from "../components/PageSection";
import AudioPlayer from "../components/AudioPlayer";

const useStyles = makeStyles((theme) => ({
    lyrics: {
        fontFamily: theme.typography.fontFamily,
    },
}));

const albumAndArtists = ({ album, artists }) => (
    <>
        <Link to={`/albums/${album.id}`} underline="none" component={RouterLink}>
            <Typography variant="h6" component="span" display="block">{album.name}</Typography>
        </Link>
        <Typography variant="h6" component="span">by </Typography>
        {
            artists.map(({ id, name }, index) => (
                <React.Fragment key={id}>
                    <Link to={`/artists/${id}`} underline="none" component={RouterLink}>
                        <Typography variant="h6" component="span">
                            {name}
                        </Typography>
                    </Link>
                    {index !== artists.length - 1 ? ", " : null}
                </React.Fragment>
            ))
        }
    </>
);

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
                    titleUrl={track.external_urls.spotify}
                    subtitle={albumAndArtists(track)}
                    popularity={track.popularity}
                    component={ track.preview_url ? <AudioPlayer url={track.preview_url} /> : null}
                >
                    <PageSection title="lyrics">
                        {track.lyrics && <pre className={classes.lyrics}>{track.lyrics}</pre>}
                        {!track.lyrics && <p>Lyrics not found</p>}
                    </PageSection>
                </PageWithHeader>
                }
            </>
        </PageLayout>
    );
};

albumAndArtists.propTypes = {
    album: PropTypes.object.isRequired,
    artists: PropTypes.array.isRequired,
};

export default TrackPage;
