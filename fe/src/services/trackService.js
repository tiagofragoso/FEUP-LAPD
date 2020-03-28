import apiFetch from "../utils/apiFetch";
import { setTrack, setTrackError, setTrackLoading } from "../actions/trackActions";

export const getTrack = (id) => async (dispatch) => {
    dispatch(setTrackLoading(true));
    dispatch(setTrackError(false));

    try {
        const res = await apiFetch(`tracks/${id}`);

        if (res.status !== 200) {
            console.error("track lookup failed:", res.status);
            dispatch(setTrackError("Track lookup failed"));
            dispatch(setTrackLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setTrack(data));
        dispatch(setTrackLoading(false));
    } catch (error) {
        console.error("track lookup failed:", error);
        dispatch(setTrackError("Track lookup failed"));
        dispatch(setTrackLoading(false));
    }
};
