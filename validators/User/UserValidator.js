const { check, validationResult } = require('express-validator')
const User = require('../../models/users')

const generateValidators = () => [
    check('full_name')
        .notEmpty()
        .withMessage('Fullname field is required'),
    check('email')
        .notEmpty()
        .withMessage('Email field is required')
        .isEmail()
        .withMessage('Must be a valid email')
        .custom((email, { req }) => {
            return User.find({
                email,
                _id: {$nin : [req.params.id]}
            }).then(user => {
                if (user.length > 0) return Promise.reject('This email has been taken')
            })
        }),
    check('password')
        .notEmpty()
        .withMessage('Fullname field is required'),
    check('password_confirmation')
        .notEmpty()
        .withMessage('Password Confirmation field is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) throw new Error('Password confirmation does not match password');
            return true
        })
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
