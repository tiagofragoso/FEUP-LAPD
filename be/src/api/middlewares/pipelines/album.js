const { lookup_album } = require("../../../lib/ext_apis/spotify");
const { get_extract } = require("../../../lib/ext_apis/wikipedia");

const album_pipeline = async ({ params }, res) => {
    const { id } = params;

    let spotify_album_res;

    try {
        spotify_album_res = await lookup_album(id);
    } catch (err) {
        console.error(`Album lookup failed: ${err}`);
        res.status(500).send();
        return;
    }

    if (!spotify_album_res) {
        res.status(500).send();
        return;
    }

    const wikipedia_extract = await get_extract(spotify_album_res.name);

    res.status(200).send({ ...spotify_album_res, description: wikipedia_extract });

};

module.exports = album_pipeline;