import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import trackReducer from "./trackReducer";

export default combineReducers({
    search: searchReducer,
    track: trackReducer,
});
