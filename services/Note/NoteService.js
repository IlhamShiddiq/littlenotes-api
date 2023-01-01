const Note = require('../../models/notes')
const NoteResource = require('../../resources/Note/NoteResource')

class NoteService
{
    static fetchAll = async (req, res) => {
        try {
            const notes = await this._getFetchQuery(req)

            res.json({
                status: 'success',
                message: 'Notes retrieved',
                data: NoteResource.collection(notes)
            })
        } catch (error) {
            res.status(500).json({status: 'failed', message: error.message})
        }
    }

    static fetchAllArchived = async (req, res) => {
        try {
            const notes = await this._getFetchQuery(req, true)

            res.json({
                status: 'success',
                message: 'Notes retrieved',
                data: NoteResource.collection(notes)
            })
        } catch (error) {
            res.status(500).json({status: 'failed', message: error.message})
        }
    }

    static fetchDetail = async (req, res) => {
        try {
            const note = await Note.findById(req.params.id)

            note ? res.json({
                status: 'success',
                message: 'Note retrieved',
                data: new NoteResource(note).exec()
            }) : res.status(404).json({status: 'failed', message: 'Data Not Found'})
        } catch (error) {
            res.status(500).json({status: 'failed', message: error.message})
        }
    }

    static store = async (req, res) => {
        const note = new Note({
            title: req.body.title,
            body: req.body.body,
            owner: req.user.id,
        })

        try {
            const newNote = await note.save()
            res.json({
                status: 'success',
                message: 'Note created',
                data: new NoteResource(newNote).exec()
            })
        } catch (error) {
            res.status(500).json({status: 'failed', message: error.message})
        }
    }

    static update = async (req, res) => {
        const checkNote = await Note.findById(req.params.id)
        if (!checkNote) res.status(404).json({message: 'Data Not Found'})
        else {
            const payload = {
                title: req.body.title,
                body: req.body.body,
                updated_at: Date.now()
            }

            try {
                await Note.updateOne({_id: req.params.id}, payload)
                res.json({
                    status: 'success',
                    message: 'Note updated'
                })
            } catch (error) {
                res.status(500).json({status: 'failed', message: error.message})
            }
        }
    }

    static delete = async (req, res) => {
        try {
            await Note.deleteOne({_id: req.params.id})
            res.json({
                status: 'success',
                message: 'Note deleted'
            })
        } catch (error) {
            res.status(500).json({status: 'failed', message: error.message})
        }
    }

    static setArchive = async (req, res) => {
        const checkNote = await Note.findById(req.params.id)
        if (!checkNote) res.status(404).json({message: 'Data Not Found'})
        else {
            try {
                await Note.updateOne({_id: req.params.id}, {is_archived: true})
                res.json({
                    status: 'success',
                    message: 'Note archived'
                })
            } catch (error) {
                res.status(500).json({status: 'failed', message: error.message})
            }
        }
    }

    static setUnarchive = async (req, res) => {
        const checkNote = await Note.findById(req.params.id)
        if (!checkNote) res.status(404).json({message: 'Data Not Found'})
        else {
            try {
                await Note.updateOne({_id: req.params.id}, {is_archived: false})
                res.json({
                    status: 'success',
                    message: 'Note unarchived'
                })
            } catch (error) {
                res.status(500).json({status: 'failed', message: error.message})
            }
        }
    }

    // Utilities Method
    static _getFetchQuery = async (req, is_archived = false) => {
        const searched_keyword = req.query.search || null
        let notes = Note.find({owner: req.user.id, is_archived: is_archived})
        if (searched_keyword) notes = notes.find({title: {$regex: searched_keyword, $options: 'i'}})

        return await notes.sort({created_at: -1}).exec()
    }
}

module.exports = NoteService
