const jwt = require('jsonwebtoken')
const { CONFIGS } = require('../config/configs')

const AuthenticateJWT = (req, res, next) => {
    const auth_header = req.headers.authorization
    if (auth_header) {
        const token = auth_header.split(' ')[1];

        jwt.verify(token, CONFIGS.jwt.secret_key, (err, user) => {
            if (err) res.status(403).json({message: 'Forbidden'})

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = AuthenticateJWT
