const { lookup_track } = require("../../../lib/ext_apis/spotify");
const { get_lyrics } = require("../../../lib/ext_apis/lyrics_ovh");

const track_pipeline = async ({ params }, res) => {
    const { id } = params;

    let spotify_res;

    try {
        spotify_res = await lookup_track(id);
    } catch (err) {
        console.error(`Track lookup failed: ${err}`);
        res.status(500).send();
        return;
    }

    if (!spotify_res) {
        res.status(500).send();
        return;
    }

    const track = spotify_res.name;
    const artist = spotify_res.artists[0].name; // Investigate how Spotify sorts artists

    try {
        const lyrics_res = await get_lyrics(artist, track);

        // If no error occurred, send lyrics
        res.status(200).send({ ...spotify_res, lyrics: lyrics_res.lyrics });
    } catch (err) {
        console.error(`Lyrics fetch failed: ${err}`);

        // We prolly want to do some more tries here
        // e.g., "Song X - feat. Artist Y" should be tested as "Song X"

        // If error ocucrred, let's just return the data from spotify
        res.status(200).send({ ...spotify_res, lyrics: null });
        return;
    }

};

module.exports = track_pipeline;
