const axios = require("axios");

// Remove diacritics
const normalize_string = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const get_lyrics = async (artist, track) => {
    const normalized_artist = normalize_string(artist);
    const normalized_track = normalize_string(track);
    const res = await axios.get(`https://api.lyrics.ovh/v1/${normalized_artist}/${normalized_track}`);
    return res.data;
};

module.exports = {
    get_lyrics,
};
