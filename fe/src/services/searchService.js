import apiFetch from "../utils/apiFetch";
import { setSearchError, setSearchLoading, setSearchResults } from "../actions/searchActions";

export const search = (query) => async (dispatch) => {
    dispatch(setSearchLoading(true));
    dispatch(setSearchError(false));

    try {
        const res = await apiFetch("search", query);

        if (res.status !== 200) {
            console.error("search failed:", res.status);
            dispatch(setSearchError("Search failed"));
            dispatch(setSearchLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setSearchResults(data));
        dispatch(setSearchLoading(false));
    } catch (error) {
        console.error("search failed:", error);
        dispatch(setSearchError("Search failed"));
        dispatch(setSearchLoading(false));
    }
};
