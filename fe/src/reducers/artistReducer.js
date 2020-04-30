import { artistLookupTypes } from "../actions/artistActions";

const initialState = {
    artist: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case artistLookupTypes.SET_ARTIST:
            return {
                ...state,
                artist: action.payload,
            };
        case artistLookupTypes.SET_ARTIST_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case artistLookupTypes.SET_ARTIST_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
