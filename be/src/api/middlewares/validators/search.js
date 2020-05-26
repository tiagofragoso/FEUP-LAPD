const { query } = require("express-validator");

const useValidators = require("../../middlewares");

const search_validator = useValidators([
    query("q")
        .exists({ checkNull: true, checkFalsy: true }) // make sure empty strings are not accepted
        .withMessage("Query term must be provided")
        .bail(),
    query("type")
        .exists()
        .customSanitizer((input) => input.split(","))
        .isArray({ max: 3 }) // minimum is 1 category, max is 3 categories
        .custom((input) => input.every((e) => ["artist", "album", "track"].includes(e)))
        .bail(),
]);

module.exports = search_validator;
