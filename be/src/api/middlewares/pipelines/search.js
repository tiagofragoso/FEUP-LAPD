const { search } = require("../../../lib/ext_apis/spotify");
const { search_serializer } = require("../serializers/search");

const search_pipeline = async ({ query: { q, type } }, res) => {
    try {
        const spotify_res = await search({ q, type: type.join(",") });

        if (spotify_res) {
            res.status(200).send(search_serializer(spotify_res));
        } else {
            res.status(500).send();
        }
    } catch (err) {
        res.status(500).send();
    }
};

module.exports = search_pipeline;
