const axios = require("axios");

const API_URL = "https://api.lyrics.ovh/v1";

// Remove diacritics
const normalize_string = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const get_lyrics = async (artist, track) => {
    const normalized_artist = normalize_string(artist);
    const normalized_track = normalize_string(track);
    try {
        const { data: { lyrics } } = await axios.get(`${API_URL}/${normalized_artist}/${normalized_track}`);
        return formatLyrics(lyrics);
    } catch (err) {
        console.error("Error fetching lyrics from lyrics.ovh: ", err);
        return null;
    }
};

const formatLyrics = (lyrics) => {
    if (lyrics.includes("\n\n\n\n")) {
        return lyrics.replace(/\r\n\n/, "\r\n").replace(/\n\n/g, "\n");
    }

    return lyrics;
};

module.exports = {
    get_lyrics,
};
