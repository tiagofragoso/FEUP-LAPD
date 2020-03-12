const { Router } = require("express");
const { search_validator } = require("../middlewares/validators");

const router = Router();

router.get("/", search_validator, (req, res) => res.json({ param: req.param, query: req.query }));

module.exports = router;
