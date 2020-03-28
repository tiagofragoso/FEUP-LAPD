const { Router } = require("express");
const search_router = require("./routes/search");
const lookup_router = require("./routes/lookup");

const app = Router();

app.use("/search", search_router);
app.use("/", lookup_router);

module.exports = app;
