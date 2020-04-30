import { albumLookupTypes } from "../actions/albumActions";

const initialState = {
    album: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case albumLookupTypes.SET_ALBUM:
            return {
                ...state,
                album: action.payload,
            };
        case albumLookupTypes.SET_ALBUM_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case albumLookupTypes.SET_ALBUM_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
