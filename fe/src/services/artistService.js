import apiFetch from "../utils/apiFetch";
import { setArtist, setArtistError, setArtistLoading } from "../actions/artistActions";

export const getArtist = (id) => async (dispatch) => {
    dispatch(setArtistLoading(true));
    dispatch(setArtistError(false));

    try {
        const res = await apiFetch(`artists/${id}`);

        if (res.status !== 200) {
            console.error("artist lookup failed:", res.status);
            dispatch(setArtistError("Artist lookup failed"));
            dispatch(setArtistLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setArtist(data));
        dispatch(setArtistLoading(false));
    } catch (error) {
        console.error("artist lookup failed:", error);
        dispatch(setArtistError("Artist lookup failed"));
        dispatch(setArtistLoading(false));
    }
};
