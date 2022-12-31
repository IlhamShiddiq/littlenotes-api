const express = require('express')
const router = express.Router()
const NoteService = require('../services/Note/NoteService')
const NoteValidator = require('../validators/Note/NoteValidator')

router.get('/', NoteService.fetchAll)
router.get('/by/:owner', NoteService.fetchByOwner)
router.get('/:id', NoteService.fetchDetail)
router.post('/', NoteValidator, NoteService.store)
router.put('/:id', NoteValidator, NoteService.update)
router.delete('/:id', NoteService.delete)

module.exports = router
