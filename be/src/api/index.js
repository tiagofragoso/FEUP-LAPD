const { Router } = require("express");
const query_router = require("./routes/query");

const app = Router();

app.use("/query", query_router);

module.exports = app;
