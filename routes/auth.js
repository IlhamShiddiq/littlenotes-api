const express = require('express')
const router = express.Router()
const AuthService = require('./../services/Auth/AuthService')
const LoginValidator = require('../validators/Auth/LoginValidator')
const UserValidator = require('../validators/User/UserValidator')

router.post('/login', LoginValidator, AuthService.login)
router.post('/register', UserValidator, AuthService.register)

module.exports = router
