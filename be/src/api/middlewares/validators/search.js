const { query } = require("express-validator");

const useValidators = require("../../middlewares");

const search_validator = useValidators([
    query("q")
        .exists({ checkNull: true, checkFalsy: true }) // make sure empty strings are not accepted
        .withMessage("Query term must be provided")
        .bail(),
    query("only")
        .optional()
        .customSanitizer((input) => input.split(","))
        .isArray({ max: 3 }) // minimum is 1 category, max is 3 categories
        .custom((input) => input.every((e) => ["artist", "album", "song"].includes(e))),
]);

module.exports = search_validator;
