import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import trackReducer from "./trackReducer";
import albumReducer from "./albumReducer";

export default combineReducers({
    search: searchReducer,
    track: trackReducer,
    album: albumReducer,
});
