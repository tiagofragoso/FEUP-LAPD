const { lookup_track } = require("../../../lib/ext_apis/spotify");
const { get_lyrics } = require("../../../lib/ext_apis/lyrics_ovh");
const { serialize_track } = require("../serializers/track");

const track_pipeline = async ({ params }, res) => {
    const { id } = params;

    const spotify_res = await lookup_track(id);

    if (!spotify_res) {
        res.status(500).send();
        return;
    }

    const track = spotify_res.name;
    const artists = spotify_res.artists.map((a) => a.name); // Investigate how Spotify sorts artists

    const lyrics_res = await get_lyrics(artists, track);
    const serialized_track = serialize_track({ ...spotify_res, lyrics: lyrics_res });
    res.status(200).send(serialized_track);

};

module.exports = track_pipeline;
