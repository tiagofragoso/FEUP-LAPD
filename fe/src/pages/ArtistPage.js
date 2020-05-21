import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../services/artistService";
import { Button, Grid, Icon, Link, Typography, makeStyles } from "@material-ui/core";
import { Link as RouterLink } from "@reach/router";

import PageLayout from "../components/PageLayout";
import PageWithHeader from "../components/PageWithHeader";
import PageSection from "../components/PageSection";
import TrackCard from "../components/albumpage/TrackCard";
import GenreList from "../components/GenreList";

const useStyles = makeStyles((theme) => ({
    albumCover: {
        position: "relative",
    },
    albumCoverImage: {
        borderRadius: theme.shape.borderRadius,
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "calc(100% - 4px)",
        backgroundColor: "#454545",
        borderRadius: theme.shape.borderRadius,
        opacity: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(3),
        textAlign: "center",
        fontWeight: theme.typography.fontWeightBold,
        color: "white",
        transition: ".3s ease",
        "&:hover": {
            opacity: 0.8,
        },
    },
    loadMoreBtn: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1, 2),
        backgroundColor: "#F3F3F3",
    },
    columnCenter: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    readMoreBtn: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(1, 2),
        backgroundColor: "#F3F3F3",
        "& .MuiIcon-root ": {
            width: "auto",
        },
    },
    center: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
}));

export const ArtistPage = ({ id }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const { artist, loading, error } = useSelector((state) => state.artist);
    const [expanded, setExpanded] = useState(false);
    const [albumCount, setAlbumCount] = useState(8);

    const loadMoreAlbums = () => {
        setExpanded(true);
        setAlbumCount(albumCount + 8);
    };

    useEffect(() => {
        dispatch(getArtist(id));
    }, [dispatch, id]);

    return (
        <PageLayout>
            <div>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && artist  &&
                <PageWithHeader
                    image={artist.images[0].url}
                    title={artist.name}
                    titleUrl={artist.external_urls.spotify}
                    subtitle={
                        <Typography variant="h6" component="span">
                            <strong>{artist.followers.total}</strong> followers
                        </Typography>
                    }
                    popularity={artist.popularity}
                    component={<GenreList genres={artist.genres} />}
                    expandedComponent
                >
                    <Grid container alignItems="stretch" spacing={2}>
                        <Grid item xs={12} md={expanded ? 12 : 5}>
                            <PageSection title="top tracks">
                                <div className={classes.columnCenter}>
                                    <Grid container alignItems="stretch" spacing={2} >
                                        {
                                            (expanded ?
                                                artist.top_tracks.tracks :
                                                artist.top_tracks.tracks.slice(0, 5)
                                            ).map((t, i) =>
                                                <Grid key={i} item xs={12} md={expanded ? 6 : 12}>
                                                    <TrackCard track={t} collapsed />
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                    {!expanded &&
                                        <Button
                                            size="large"
                                            variant="contained"
                                            disableElevation
                                            disableRipple
                                            className={classes.loadMoreBtn}
                                            onClick={() => setExpanded(true)}
                                        >
                                            LOAD MORE TRACKS
                                        </Button>
                                    }
                                </div>
                            </PageSection>
                        </Grid>
                        <Grid item xs={12} md={expanded ? 12 : 7}>
                            <PageSection title="albums">
                                <div className={classes.columnCenter}>
                                    <Grid container alignItems="stretch" spacing={2}>
                                        {
                                            artist.albums.items.slice(0, albumCount).map((a, i) =>
                                                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                                                    <Link to={`/albums/${a.id}`} underline="none" component={RouterLink}>
                                                        <div className={classes.albumCover}>
                                                            <img className={classes.albumCoverImage} alt={a.name} src={a.images[0].url} width="100%" />
                                                            <div className={classes.overlay}>
                                                                <span>{a.name}</span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </Grid>
                                            )
                                        }
                                    </Grid>
                                    {
                                        (albumCount <= artist.albums.items.length) &&
                                        <Button
                                            size="large"
                                            variant="contained"
                                            disableElevation
                                            disableRipple
                                            className={classes.loadMoreBtn}
                                            onClick={loadMoreAlbums}
                                        >
                                            LOAD MORE ALBUMS
                                        </Button>
                                    }
                                </div>
                            </PageSection>
                        </Grid>
                        <Grid item xs={12}>
                            { artist.description &&
                            <PageSection title="more about the artist">
                                <>
                                    <Typography variant="body1">{artist.description}</Typography>
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
                        </Grid>
                    </Grid>
                </PageWithHeader>
                }
            </div>
        </PageLayout>
    );
};

export default ArtistPage;
