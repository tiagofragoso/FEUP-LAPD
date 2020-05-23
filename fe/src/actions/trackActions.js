import { createAction } from "redux-actions";

export const trackLookupTypes = Object.freeze({
    SET_TRACK_LOADING: "SET_TRACK_LOADING",
    SET_TRACK_ERROR: "SET_TRACK_ERROR",
    SET_TRACK_LYRICS_LOADING: "SET_TRACK_LYRICS_LOADING",
    SET_TRACK_LYRICS: "SET_TRACK_LYRICS",
    SET_TRACK: "SET_TRACK",
});

export const setTrackLoading = createAction(trackLookupTypes.SET_TRACK_LOADING);
export const setTrackError = createAction(trackLookupTypes.SET_TRACK_ERROR);
export const setTrackLyricsLoading = createAction(trackLookupTypes.SET_TRACK_LYRICS_LOADING);
export const setTrackLyrics = createAction(trackLookupTypes.SET_TRACK_LYRICS);
export const setTrack = createAction(trackLookupTypes.SET_TRACK);
