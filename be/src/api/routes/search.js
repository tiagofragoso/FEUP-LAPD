const { Router } = require("express");
const { search_validator } = require("../middlewares/validators");
const { search } = require("../../lib/ext_apis/spotify");

const router = Router();

router.get("/", search_validator, async (req, res) => res.json(await search(req.query.q)));

module.exports = router;
