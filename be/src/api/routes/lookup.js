const { Router } = require("express");
const { album_pipeline, track_pipeline } = require("../middlewares/pipelines");

const router = Router();

router.get("/tracks/:id", track_pipeline);

router.get("/albums/:id", album_pipeline);

module.exports = router;
