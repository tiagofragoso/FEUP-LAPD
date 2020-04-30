import { createAction } from "redux-actions";

export const albumLookupTypes = Object.freeze({
    SET_ALBUM_LOADING: "SET_ALBUM_LOADING",
    SET_ALBUM_ERROR: "SET_ALBUM_ERROR",
    SET_ALBUM: "SET_ALBUM",
});

export const setAlbumLoading = createAction(albumLookupTypes.SET_ALBUM_LOADING);
export const setAlbumError = createAction(albumLookupTypes.SET_ALBUM_ERROR);
export const setAlbum = createAction(albumLookupTypes.SET_ALBUM);
