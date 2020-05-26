const { filterKeys } = require("../../../utils/serializer");

const serialize_artist = (result) => (
    {
        ...filterKeys(result, [
            "albums",
            "description",
            "external_urls",
            "genres",
            "id",
            "name",
            "popularity",
            "top_tracks",
        ]),
        followers: result.followers.total,
        top_tracks: result.top_tracks.tracks.map((t) => ({
            ...filterKeys(t, ["id", "name"]),
            artists: t.artists.map((a) => filterKeys(a, ["id", "name"])),
        })),
        albums: result.albums.items.map((a) => ({
            ...filterKeys(a, ["id", "name"]),
            image: a.images[0] ? a.images[0].url : null,
        })),
        image: result.images[0] ? result.images[0].url : null,
    });

module.exports = {
    serialize_artist,
};
