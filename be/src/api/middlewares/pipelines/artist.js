const { lookup_artist, lookup_artist_top_tracks, lookup_artist_albums, SPOTIFY_ERRORS } = require("../../../lib/ext_apis/spotify");
const { get_extract } = require("../../../lib/ext_apis/wikipedia");
const { serialize_artist } = require("../serializers/artist");

const artist_pipeline = async ({ params }, res) => {
    const { id } = params;

    let spotify_artist_res;
    try {
        spotify_artist_res = await lookup_artist(id);
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

    if (!spotify_artist_res) {
        res.status(500).send();
        return;
    }

    const [
        top_tracks,
        albums,
        wikipedia_extract,
    ] = await Promise.all([
        lookup_artist_top_tracks(id),
        lookup_artist_albums(id),
        get_extract(spotify_artist_res.name, "artist"),
    ]);

    const serialized_artist = serialize_artist({ ...spotify_artist_res, albums, top_tracks, description: wikipedia_extract });

    res.status(200).send(serialized_artist);

};

module.exports = artist_pipeline;
