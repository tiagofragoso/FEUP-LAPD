require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    VAGALUME_API_KEY: process.env.VAGALUME_API_KEY,
};
