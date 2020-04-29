const { lookup_track } = require("../../../lib/ext_apis/spotify");
const { get_lyrics } = require("../../../lib/ext_apis/lyrics_ovh");

const track_pipeline = async ({ params }, res) => {
    const { id } = params;

    const spotify_res = await lookup_track(id);

    if (!spotify_res) {
        res.status(500).send();
        return;
    }

    const track = spotify_res.name;
    const artist = spotify_res.artists[0].name; // Investigate how Spotify sorts artists

    const lyrics_res = await get_lyrics(artist, track);
    res.status(200).send({ ...spotify_res, lyrics: lyrics_res.lyrics });

};

module.exports = track_pipeline;
