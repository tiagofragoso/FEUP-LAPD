import { createAction } from "redux-actions";

export const artistLookupTypes = Object.freeze({
    SET_ARTIST_LOADING: "SET_ARTIST_LOADING",
    SET_ARTIST_ERROR: "SET_ARTIST_ERROR",
    SET_ARTIST: "SET_ARTIST",
});

export const setArtistLoading = createAction(artistLookupTypes.SET_ARTIST_LOADING);
export const setArtistError = createAction(artistLookupTypes.SET_ARTIST_ERROR);
export const setArtist = createAction(artistLookupTypes.SET_ARTIST);
