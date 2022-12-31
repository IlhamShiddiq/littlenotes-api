const { check, validationResult } = require('express-validator')

const generateValidators = () => [
    check('email')
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Must be a valid email'),
    check('password')
        .notEmpty()
        .withMessage('Fullname field is required'),
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
