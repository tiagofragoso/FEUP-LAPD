import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAlbum } from "../services/albumService";
import { Typography } from "@material-ui/core";

export const AlbumPage = ({ id }) => {

    const dispatch = useDispatch();
    const { album, loading, error } = useSelector((state) => state.album);
    useEffect(() => {
        dispatch(getAlbum(id));
    }, [dispatch, id]);

    return (
        <div>
            { loading && <p>Loading</p> }
            { error && <p>Error: {error.toString()}</p> }
            { !loading && !error && album  &&
            <>
                <Typography component="h3" variant="h3">
                    {album.name}
                </Typography>
                <Typography component="h5" variant="h5">
                    {album.artists.map((a) => a.name).toString()}
                </Typography>
                { album.tracks.items.map((t, i) => <p key={i}><strong>{t.track_number}.</strong> {t.name}</p>) }
                <Typography component="h4" variant="h4">
                    Description
                </Typography>
                { album.description ?
                    <p>{album.description}</p> :
                    <p>Description not found</p>
                }
            </>
            }
        </div>
    );
};

export default AlbumPage;
