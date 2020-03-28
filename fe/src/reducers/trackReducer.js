import { trackLookupTypes } from "../actions/trackActions";

const initialState = {
    track: null,
    loading: false,
    error: false,
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
        default:
            return state;
    }
};
