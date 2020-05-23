import { trackLookupTypes } from "../actions/trackActions";

const initialState = {
    track: null,
    loading: false,
    error: false,
    lyricsLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case trackLookupTypes.SET_TRACK:
            return {
                ...state,
                track: action.payload,
            };
        case trackLookupTypes.SET_TRACK_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case trackLookupTypes.SET_TRACK_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case trackLookupTypes.SET_TRACK_LYRICS_LOADING:
            return {
                ...state,
                lyricsLoading: action.payload,
            };
        case trackLookupTypes.SET_TRACK_LYRICS:
            return {
                ...state,
                track: {
                    ...state.track,
                    lyrics: {
                        ...state.track.lyrics,
                        lyrics: action.payload,
                    },
                },
            };
        default:
            return state;
    }
};
