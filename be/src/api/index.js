const { Router } = require("express");
const search_router = require("./routes/search");

const app = Router();

app.use("/search", search_router);

module.exports = app;
