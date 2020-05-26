const { filterKeys } = require("../../../utils/serializer");

const search_serializer = (results) => {
    const res = {};
    if (results.artists) {
        res.artists = results.artists.items.map((a) => ({
            ...filterKeys(a, ["id", "name"]),
            image: a.images[0] ? a.images[0].url : null,
        }));
    }

    if (results.albums) {
        res.albums = results.albums.items.map((a) => ({
            ...filterKeys(a, ["id", "name"]),
            artists: a.artists.map((ar) => filterKeys(ar, ["id", "name"])),
            image: a.images[0] ? a.images[0].url : null,
        }));
    }

    if (results.tracks) {
        res.tracks = results.tracks.items.map((t) => ({
            ...filterKeys(t, ["id", "name"]),
            artists: t.artists.map((ar) => filterKeys(ar, ["id", "name"])),
            image: t.album.images[0] ? t.album.images[0].url : null,
        }));
    }
    return res;
};

module.exports = {
    search_serializer,
};
