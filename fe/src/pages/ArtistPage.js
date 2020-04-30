import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtist } from "../services/artistService";
import { Typography } from "@material-ui/core";
import PageLayout from "../components/PageLayout";

export const ArtistPage = ({ id }) => {

    const dispatch = useDispatch();
    const { artist, loading, error } = useSelector((state) => state.artist);
    useEffect(() => {
        dispatch(getArtist(id));
    }, [dispatch, id]);

    return (
        <PageLayout>
            <div>
                { loading && <p>Loading</p> }
                { error && <p>Error: {error.toString()}</p> }
                { !loading && !error && artist  &&
                <>
                    <Typography component="h3" variant="h3">
                        {artist.name}
                    </Typography>
                    <Typography component="h5" variant="h5">
                        <strong>{artist.followers.total}</strong> followers
                    </Typography>
                    <p>Popularity {artist.popularity}</p>
                    <p>{artist.genres.join(",")}</p>
                    <Typography component="h4" variant="h4">
                        Top Tracks
                    </Typography>
                    {
                        artist.top_tracks && artist.top_tracks.tracks.map((t, i) =>
                            <p key={i}>{t.name}</p>
                        )
                    }
                    <Typography component="h4" variant="h4">
                        Albums
                    </Typography>
                    {
                        artist.albums && artist.albums.items.map((a, i) =>
                            <p key={i}>{a.name}</p>
                        )
                    }
                    <Typography component="h4" variant="h4">
                        Description
                    </Typography>
                    { artist.description ?
                        <p>{artist.description}</p> :
                        <p>Description not found</p>
                    }
                </>
                }
            </div>
        </PageLayout>
    );
};

export default ArtistPage;
