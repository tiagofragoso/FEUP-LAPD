const { validationResult } = require("express-validator");

// Automatically run validators in order to have a standardized error response
const useValidators = (validators) => async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));

    const errors = validationResult(req);

    // If no errors exist, proceed
    if (errors.isEmpty()) {
        return next();
    }

    // Otherwise, return 422 with the error array
    return res.status(422).json(errors.array());
};

module.exports = useValidators;
