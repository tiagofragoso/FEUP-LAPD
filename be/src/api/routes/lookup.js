const { Router } = require("express");
const { track_pipeline } = require("../middlewares/pipelines/index");

const router = Router();

router.get("/tracks/:id", track_pipeline);

module.exports = router;
