const { Router } = require("express");
const { search_validator } = require("../middlewares/validators");

const router = Router();

router.get("/", search_validator, (req, res) => res.json(["res1", "res2", "res3"]));

module.exports = router;
