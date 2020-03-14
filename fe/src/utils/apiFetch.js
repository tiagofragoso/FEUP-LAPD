import config from "../config";
import qs from "querystring";

export default (path, params = null, options = {}) => {
    const { API_URL } = config;

    const url = `${API_URL}/${path}${params ? `?${qs.stringify(params)}` : ""}`;
    return fetch(url, {
        ...options,
    });
};
