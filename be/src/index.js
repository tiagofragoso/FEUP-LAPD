require("dotenv").config();
const express = require("express");
const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Started listening on port ${port}`),
);

app.get("/", (req, res) => res.send("I'm alive!"));
