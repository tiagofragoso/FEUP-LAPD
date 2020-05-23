import trackPlaceholder from "../assets/track_placeholder.png";

export default (item, type) => {
    const imgArray = type !== "track" ? item.images : item.album.images;
    if (imgArray.length) {
        return imgArray[0].url;
    } else {
        return trackPlaceholder;
    }
};
