require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./api");

const port = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Health check endpoint
app.get("/", (_, res) => res.status(200).json({ online: true }));

app.listen(port, () =>
    // eslint-disable-next-line no-console
    console.log(`Started listening on port ${port}`),
);
