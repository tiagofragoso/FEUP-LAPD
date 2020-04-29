const axios = require("axios");
const qs = require("querystring");

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = require("../../config");

let bearer_token;

const auth = async () => {
    try {
        const res = await axios.post(
            "https://accounts.spotify.com/api/token",
            qs.stringify({ grant_type: "client_credentials" }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                auth: {
                    "username": SPOTIFY_CLIENT_ID,
                    "password": SPOTIFY_CLIENT_SECRET,
                },
            });

        const { data } = res;
        console.log("Setting bearer token");
        bearer_token = data.access_token;
        return true;
    } catch (err) {
        console.error("Error authenticating to Spotify: ", err);
        return false;
    }
};

const request = async (url, options = {}) => {
    try {
        if (!bearer_token) {
            console.log("No bearer token set. Re-authenticating");
            const success = await auth();
            if (!success)
                return null;
        }

        const res = await axios.get(
            url,
            {
                ...options,
                params: {
                    ...options.params,
                    "market": "pt",
                },
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${bearer_token}`,
                },
            },
        );

        return res.data;

    } catch (err) {
        if (err.response.status === 401) {
            bearer_token = null;
            console.log("Got 401. Re-authenticating");
            return request(url, options);
        } else {
            console.error(err);
            return null;
        }
    }
};

const search = (query) => request(
    "https://api.spotify.com/v1/search",
    {
        params: {
            "q": query,
            "type": "album,artist,track",
            "limit": "5",
        },
    },
);

const lookup_track = (id) => request(`https://api.spotify.com/v1/tracks/${id}`);

const lookup_tracks = (ids) => request(
    "https://api.spotify.com/v1/tracks/",
    {
        params: {
            "ids": ids.join(","),
        },
    },
);

const lookup_album = (id) => request(`https://api.spotify.com/v1/albums/${id}`);

const lookup_artist = (id) => request(`https://api.spotify.com/v1/artists/${id}`);

const lookup_artist_top_tracks = (id) => request(`https://api.spotify.com/v1/artists/${id}/top-tracks`);

const lookup_artist_albums = (id) => request(`https://api.spotify.com/v1/artists/${id}/albums`);

module.exports = {
    search,
    lookup_track,
    lookup_tracks,
    lookup_album,
    lookup_artist,
    lookup_artist_top_tracks,
    lookup_artist_albums,
};
