const { filterKeys } = require("../../../utils/serializer");

const serialize_album = (result) => (
    {
        ...filterKeys(result, [
            "album_type",
            "artists",
            "copyrights",
            "description",
            "external_ids",
            "external_urls",
            "genres",
            "id",
            "label",
            "name",
            "popularity",
            "release_date",
            "tracks",
        ]),
        artists: result.artists.map((a) => filterKeys(a, ["id", "name"])),
        tracks: result.tracks.items.map((t) => (
            {
                ...filterKeys(t, [
                    "artists",
                    "duration_ms",
                    "explicit",
                    "external_urls",
                    "id",
                    "name",
                    "track_number",
                ]),
                artists: t.artists.map((a) => filterKeys(a, ["id", "name"])),
            })),
        image: result.images[0] ? result.images[0].url : null,
    });

module.exports = {
    serialize_album,
};
