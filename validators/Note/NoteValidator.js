const { check, validationResult } = require('express-validator')

const generateValidators = () => [
    check('title')
        .notEmpty()
        .withMessage('Title is required'),
    check('body')
        .notEmpty()
        .withMessage('Body is required'),
    check('owner')
        .notEmpty()
        .withMessage('Owner is required')
        .isUUID(4)
        .withMessage('Owner must be valid UUID'),
]

const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json({errors: errors.array()});
    next();
}

module.exports = [
    generateValidators(),
    reporter
]
