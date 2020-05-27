const { filterKeys } = require("../../../utils/serializer");

const serialize_track = (result) => (
    {
        ...filterKeys(result, [
            "album",
            "artists",
            "duration_ms",
            "explicit",
            "external_ids",
            "external_urls",
            "id",
            "name",
            "popularity",
            "preview_url",
            "lyrics",
        ]),
        artists: result.artists.map((a) => filterKeys(a, ["id", "name"])),
        album: filterKeys(result.album, ["id", "name"]),
        image: result.album.images[0] ? result.album.images[0].url : null,
    });

module.exports = {
    serialize_track,
};
