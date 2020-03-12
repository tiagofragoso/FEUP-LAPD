const { Router } = require("express");

const router = Router();

router.get("/", (_, res) => res.json({ endpoint: "query" }));

module.exports = router;
