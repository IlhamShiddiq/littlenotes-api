const Note = require('../../models/notes')
const NoteResource = require('../../resources/Note/NoteResource')

class NoteService
{
    static fetchAll = async (req, res) => {
        try {
            const notes = await Note.find({owner: req.user.id}).sort({created_at: -1})

            res.json({
                message: 'All notes data',
                data: NoteResource.collection(notes)
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static fetchDetail = async (req, res) => {
        try {
            const note = await Note.findById(req.params.id)

            note ? res.json({
                message: 'Get Detail',
                data: new NoteResource(note).exec()
            }) : res.status(404).json({message: 'Data Not Found'})
        } catch (error) {
            res.status(500).json({message: error.message})
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
                message: 'Note stored',
                data: new NoteResource(newNote).exec()
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static update = async (req, res) => {
        const checkNote = await Note.findById(req.params.id)
        if (!checkNote) res.status(404).json({message: 'Data Not Found'})

        const payload = {
            title: req.body.title,
            body: req.body.body,
            updated_at: Date.now()
        }

        try {
            await Note.updateOne({_id: req.params.id}, payload)
            res.json({
                message: 'Data updated'
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static delete = async (req, res) => {
        try {
            await Note.deleteOne({_id: req.params.id})
            res.json({
                message: 'Data deleted'
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = NoteService
