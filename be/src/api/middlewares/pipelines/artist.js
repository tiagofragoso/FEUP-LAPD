const { lookup_artist, lookup_artist_top_tracks, lookup_artist_albums } = require("../../../lib/ext_apis/spotify");
const { get_extract } = require("../../../lib/ext_apis/wikipedia");

const artist_pipeline = async ({ params }, res) => {
    const { id } = params;

    const spotify_artist_res = await lookup_artist(id);

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
        get_extract(spotify_artist_res.name),
    ]);

    res.status(200).send({ ...spotify_artist_res, albums, top_tracks, description: wikipedia_extract });

};

module.exports = artist_pipeline;
