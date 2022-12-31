const express = require('express')
const router = express.Router()
const UserService = require('./../services/User/UserService')
const UserValidator = require('../validators/User/UserValidator')

/* GET users listing. */
router.get('/', UserService.fetchAll)
router.get('/:id', UserService.fetchDetail)
router.post('/', UserValidator, UserService.store)
router.put('/:id', UserValidator, UserService.update)
router.delete('/:id', UserService.delete)

module.exports = router;
