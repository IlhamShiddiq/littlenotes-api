const mongoose = require('mongoose')
const uuid = require('node-uuid')
const Schema = mongoose.Schema

const NoteSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    is_archived: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    owner: {
        type: String,
        ref: 'users'
    }
})

module.exports = Note = mongoose.model("notes", NoteSchema)
