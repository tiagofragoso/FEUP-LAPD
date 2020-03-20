const axios = require("axios");
const qs = require("querystring");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require("../../config");

let bearer_token;

const auth = async () => {
    const res = await axios.post(
        "https://accounts.spotify.com/api/token",
        qs.stringify({ grant_type: "client_credentials" }),
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
                username: SPOTIFY_CLIENT_ID,
                password: SPOTIFY_CLIENT_SECRET,
            },
        });

    const { data } = res;
    console.log("Setting bearer token");
    bearer_token = data.access_token;
};

const request = async (url, options = {}) => {
    try {
        if (!bearer_token) {
            console.log("No bearer token set. Re-authenticating");
            await auth();
        }

        const res = await axios.get(
            url,
            {
                ...options,
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${bearer_token}`,
                },
            },
        );

        return res.data;

    } catch (err) {
        if (err.response.status === 401) {
            console.log("Got 401. Re-authenticating");
            return request(url, options);
        } else {
            console.error(err);
            throw err;
        }
    }
};

const search = (query) => request(
    "https://api.spotify.com/v1/search",
    {
        params: {
            q: query,
            type: "album,artist,track",
            limit: "5",
        },
    },
);

module.exports = {
    search,
};
