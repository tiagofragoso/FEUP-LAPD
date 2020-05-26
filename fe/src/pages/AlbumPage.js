import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../services/albumService";
import { Button, Icon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";
import PageSection from "../components/PageSection";
import TrackCard from "../components/TrackCard";
import ArtistList from "../components/ArtistList";
import GenreList from "../components/GenreList";
import { Disclaimers } from "../components/disclaimers/Disclaimer";
import getImage from "../utils/getImage";

const useStyles = makeStyles((theme) => ({
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    trackCard: {
        marginBottom: theme.spacing(2),
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
        <PageLayout loading={loading} error={error}>
            <>
                { album &&
                <PageWithHeader
                    image={getImage(album, "album")}
                    title={album.name}
                    titleUrl={album.external_urls.spotify}
                    subtitle={artists(album)}
                    popularity={album.popularity}
                    supertitle={`${album.album_type} • ${album.release_date}`}
                    component={<GenreList genres={album.genres} />}
                    expandedComponent
                >
                    <PageSection title="tracks">
                        { album.tracks.items.map((t, i) =>
                            <div key={i} className={classes.trackCard}>
                                <TrackCard track={t} />
                            </div>)
                        }
                    </PageSection>

                    { album.description &&
                        <PageSection title="more about the album">
                            <>
                                <Typography variant="body1">{album.description.extract}</Typography>
                                <div className={classes.center}>
                                    <Button
                                        size="large"
                                        variant="contained"
                                        disableElevation
                                        disableRipple
                                        className={classes.readMoreBtn}
                                        endIcon={<Icon className="fab fa-wikipedia-w"/>}
                                        href={album.description.url}
                                        target="_blank"
                                        rel="noopener"
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
            <Disclaimers spotify wikipedia />
        </PageLayout>
    );
};

artists.propTypes = {
    artists: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AlbumPage;
