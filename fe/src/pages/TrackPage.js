import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrack } from "../services/trackService";
import { makeStyles } from "@material-ui/styles";
import { Button, Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";
import PageSection from "../components/PageSection";
import AudioPlayer from "../components/AudioPlayer";
import ArtistList from "../components/ArtistList";
import SuggestionsModal from "../components/trackpage/SuggestionsModal";
import { Disclaimers } from "../components/disclaimers/Disclaimer";

const useStyles = makeStyles((theme) => ({
    lyrics: {
        fontFamily: theme.typography.fontFamily,
    },
    inlineTextBtn: {
        display: "flex",
        alignItems: "baseline",
    },
}));

const albumAndArtists = ({ album, artists }) => (
    <>
        <Link to={`/albums/${album.id}`} color="inherit" underline="none" component={RouterLink}>
            <Typography variant="h6" component="span" display="block">{album.name}</Typography>
        </Link>
        <Typography variant="h6" component="span">by </Typography>
        <ArtistList artists={artists} variant="h6" />
    </>
);

export const TrackPage = ({ id }) => {

    const dispatch = useDispatch();
    const { track, loading, loadingLyrics, error } = useSelector((state) => state.track);
    useEffect(() => {
        dispatch(getTrack(id));
    }, [dispatch, id]);

    const [openModal, setOpenModal] = useState(false);

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

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
                        {loadingLyrics && <p>Re-loading lyrics</p>}
                        {track.lyrics && track.lyrics.lyrics && track.lyrics.suggestions &&
                        <div className={classes.inlineTextBtn}>
                            <Typography variant="body1" component="span">Still not the lyrics you were looking for?</Typography>
                            <Button onClick={handleClickOpen} size="small">
                                Open suggestions
                            </Button>
                        </div>
                        }
                        {track.lyrics && track.lyrics.lyrics &&
                            <pre className={classes.lyrics}>
                                {track.lyrics.lyrics}
                            </pre>
                        }
                        <div className={classes.inlineTextBtn}>
                            {!loadingLyrics && (!track.lyrics || !track.lyrics.lyrics) &&
                            <Typography variant="body1" component="span">
                                We could not find lyrics for this track.
                            </Typography>}
                            {!loadingLyrics && track.lyrics && track.lyrics.suggestions && !track.lyrics.lyrics &&
                            <Button onClick={handleClickOpen} size="small">
                                Open suggestions
                            </Button>
                            }
                        </div>
                    </PageSection>
                    {!loadingLyrics && track.lyrics && track.lyrics.suggestions &&
                        <SuggestionsModal open={openModal} suggestions={track.lyrics.suggestions} handleClose={handleClose} />
                    }
                    <Disclaimers spotify lyrics />
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
