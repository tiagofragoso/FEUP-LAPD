import apiFetch from "../utils/apiFetch";
import { setAlbum, setAlbumError, setAlbumLoading } from "../actions/albumActions";

export const getAlbum = (id) => async (dispatch) => {
    dispatch(setAlbumLoading(true));
    dispatch(setAlbumError(false));

    try {
        const res = await apiFetch(`albums/${id}`);

        if (res.status !== 200) {
            console.error("album lookup failed:", res.status);
            dispatch(setAlbumError("Album lookup failed"));
            dispatch(setAlbumLoading(false));
            return;
        }

        const data = await res.json();
        dispatch(setAlbum(data));
        dispatch(setAlbumLoading(false));
    } catch (error) {
        console.error("album lookup failed:", error);
        dispatch(setAlbumError("Album lookup failed"));
        dispatch(setAlbumLoading(false));
    }
};
