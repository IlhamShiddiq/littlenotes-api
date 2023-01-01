const express = require('express')
const router = express.Router()
const NoteService = require('../services/Note/NoteService')
const NoteValidator = require('../validators/Note/NoteValidator')
const AuthenticateJWT = require('../middlewares/AuthenticateJWT')

router.get('/', AuthenticateJWT, NoteService.fetchAll)
router.get('/archived', AuthenticateJWT, NoteService.fetchAllArchived)
router.get('/:id', AuthenticateJWT, NoteService.fetchDetail)
router.post('/', [AuthenticateJWT, NoteValidator], NoteService.store)
router.post('/:id/archive', AuthenticateJWT, NoteService.setArchive)
router.post('/:id/unarchive', AuthenticateJWT, NoteService.setUnarchive)
router.put('/:id', [AuthenticateJWT, NoteValidator], NoteService.update)
router.delete('/:id', AuthenticateJWT, NoteService.delete)

module.exports = router
