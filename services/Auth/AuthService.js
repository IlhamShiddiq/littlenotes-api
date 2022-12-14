const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/users')
const UserService = require('../User/UserService')
const { CONFIGS } = require('./../../config/configs')

class AuthService
{
    static login = async (req, res) => {
        try {
            const checkUser = await User.findOne({email: req.body.email})

            if (checkUser && await bcrypt.compare(req.body.password, checkUser.password)) {
                const access_token = jwt.sign({
                    id: checkUser._id,
                    email: checkUser.email,
                    name: checkUser.full_name,
                }, CONFIGS.jwt.secret_key)

                res.json({
                    status: 'success',
                    message: 'User logged successfully',
                    data: {
                        accessToken: access_token
                    }
                })
            } else {
                res.status(400).json({status: 'failed', message: 'Wrong email or password!'})
            }
        } catch (error) {
            res.status(500).json({status: 'failed', message: 'Internal Server Error'})
        }
    }

    static register = async (req, res) => {
        await UserService.store(req, res)
    }
}

module.exports = AuthService
