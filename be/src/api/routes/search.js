const { Router } = require("express");
const { search_validator } = require("../middlewares/validators");
const { search_pipeline } = require("../middlewares/pipelines/index");

const router = Router();

router.get("/", search_validator, search_pipeline);

module.exports = router;
