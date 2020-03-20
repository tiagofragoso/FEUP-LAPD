import { searchTypes } from "../actions/searchActions";

const initialState = {
    results: null,
    loading: false,
    error: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case searchTypes.SET_SEARCH_RESULTS:
            return {
                ...state,
                results: action.payload,
            };
        case searchTypes.SET_SEARCH_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case searchTypes.SET_SEARCH_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        default:
            return state;
    }
};
