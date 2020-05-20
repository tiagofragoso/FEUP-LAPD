const { search } = require("../../../lib/ext_apis/spotify");

const search_pipeline = async ({ query }, res) => {

    const spotify_res = await search(query);
    if (spotify_res) {
        res.status(200).send(spotify_res);
    } else {
        res.status(500).send();
    }

};

module.exports = search_pipeline;
