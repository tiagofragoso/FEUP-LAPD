const axios = require("axios");

const API_URL = "https://api.lyrics.ovh/v1";

// Remove diacritics
const normalize_string = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const get_lyrics = async (artists, track) => {
    const normalized_artist = normalize_string(artists[0]);
    const normalized_track = normalize_string(track);
    try {
        const { data: { lyrics } } = await axios.get(`${API_URL}/${normalized_artist}/${normalized_track}`);
        return {
            lyrics: formatLyrics(lyrics),
        };
    } catch (err) {
        if (err.response.status === 404) {
            return {
                suggestions: getSuggestions(artists, track),
            };
        } else {
            console.error("Error fetching lyrics from lyrics.ovh: ", err);
        }
        return null;
    }
};

const reload_lyrics = async (artist, track) => {
    const normalized_artist = normalize_string(artist);
    const normalized_track = normalize_string(track);
    try {
        const { data: { lyrics } } = await axios.get(`${API_URL}/${normalized_artist}/${normalized_track}`);
        return formatLyrics(lyrics);
    } catch (err) {
        if (err.response.status === 404) {
            return null;
        } else {
            console.error("Error fetching lyrics from lyrics.ovh: ", err);
        }
        return null;
    }
};

const formatLyrics = (lyrics) => {
    if (lyrics.includes("\n\n\n\n")) {
        return lyrics.replace(/\r\n\n/, "\r\n").replace(/\n\n/g, "\n");
    }
    return lyrics;
};

const getSuggestions = (artists, track) => {
    const suggestions = {
        artists,
        tracks: [track],
    };
    const track_suggestion = track.replace(/(-.*)|(\(.*\))|(feat\..*)/, "").trim();
    if (track_suggestion !== track.trim()) {
        suggestions.tracks.push(track_suggestion);
    }
    if (suggestions.artists.length > 1 || suggestions.tracks.length > 1) {
        return suggestions;
    } else {
        return null;
    }
};

module.exports = {
    get_lyrics,
    reload_lyrics,
};
