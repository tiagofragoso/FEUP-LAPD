const { lookup_track, SPOTIFY_ERRORS } = require("../../../lib/ext_apis/spotify");
const { get_lyrics } = require("../../../lib/ext_apis/lyrics_ovh");
const { serialize_track } = require("../serializers/track");

const track_pipeline = async ({ params }, res) => {
    const { id } = params;

    let spotify_res;

    try {
        spotify_res = await lookup_track(id);
    } catch (err) {
        switch (err.message) {
            case SPOTIFY_ERRORS.GENERIC_ERROR:
                res.status(500).send();
                return;
            case SPOTIFY_ERRORS.NOT_FOUND:
                res.status(404).send();
                return;
            default:
                res.status(500).send();
                return;
        }
    }

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
