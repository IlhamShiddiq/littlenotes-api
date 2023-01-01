const express = require('express')
const router = express.Router()
const UserService = require('./../services/User/UserService')
const UserValidator = require('../validators/User/UserValidator')
const AuthenticateJWT = require('../middlewares/AuthenticateJWT')

/* GET users listing. */
router.get('/', AuthenticateJWT, UserService.fetchAll)
router.get('/me', AuthenticateJWT, UserService.fetchMe)
router.get('/:id', AuthenticateJWT, UserService.fetchDetail)
router.post('/', [AuthenticateJWT, UserValidator], UserService.store)
router.put('/:id', [AuthenticateJWT, UserValidator], UserService.update)
router.delete('/:id', AuthenticateJWT, UserService.delete)

module.exports = router;
