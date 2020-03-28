const { search } = require("../../../lib/ext_apis/spotify");

const search_pipeline = async ({ query }, res) => {
    const { q } = query;

    try {
        const spotify_res = await search(q);
        res.status(200).send(spotify_res);
    } catch (err) {
        res.status(500).send();
        return;
    }

};

module.exports = search_pipeline;
