import { createAction } from "redux-actions";

export const searchTypes = Object.freeze({
    SET_SEARCH_LOADING: "SET_SEARCH_LOADING",
    SET_SEARCH_ERROR: "SET_SEARCH_ERROR",
    SET_SEARCH_RESULTS: "SET_SEARCH_RESULTS",
});

export const setSearchLoading = createAction(searchTypes.SET_SEARCH_LOADING);
export const setSearchError = createAction(searchTypes.SET_SEARCH_ERROR);
export const setSearchResults = createAction(searchTypes.SET_SEARCH_RESULTS);
