
const { reload_lyrics } = require("../../../lib/ext_apis/lyrics_ovh");

const track_pipeline = async ({ params }, res) => {
    const { artist, track } = params;

    const lyrics_res = await reload_lyrics(artist, track);

    res.status(200).send({ lyrics: lyrics_res });

};

module.exports = track_pipeline;
