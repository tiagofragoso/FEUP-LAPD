import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../services/albumService";
import { Button, Icon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";
import PageSection from "../components/PageSection";
import TrackCard from "../components/albumpage/TrackCard";
import ArtistList from "../components/ArtistList";

const useStyles = makeStyles((theme) => ({
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    readMoreBtn: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1, 2),
        backgroundColor: "#F3F3F3",
        "& .MuiIcon-root ": {
            width: "auto",
        },
    },
}));

const artists = ({ artists }) => (
    <>
        <Typography variant="h6" component="span">by </Typography>
        <ArtistList artists={artists} variant="h6" />
    </>
);

export const AlbumPage = ({ id }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { album, loading, error } = useSelector((state) => state.album);
    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    return (
        <PageLayout>
            <>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && album  &&
                <PageWithHeader
                    image={album.images[0].url}
                    title={album.name}
                    titleUrl={album.external_urls.spotify}
                    subtitle={artists(album)}
                    popularity={album.popularity}
                    supertitle={`${album.album_type} • ${album.release_date}`}
                >
                    <PageSection title="tracks">
                        { album.tracks.items.map((t, i) => <TrackCard key={i} track={t} />) }
                    </PageSection>

                    { album.description &&
                        <PageSection title="more about the album">
                            <>
                                <Typography variant="body1">{album.description}</Typography>
                                <div className={classes.center}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        disableRipple
                                        className={classes.readMoreBtn}
                                        endIcon={<Icon className="fab fa-wikipedia-w"/>}
                                        href="https://wikipedia.org"
                                    >
                                        READ MORE ON
                                    </Button>
                                </div>
                            </>
                        </PageSection>
                    }
                </PageWithHeader>
                }
            </>
        </PageLayout>
    );
};

export default AlbumPage;
