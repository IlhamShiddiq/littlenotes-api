const mongoose = require('mongoose')
const uuid = require('node-uuid')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v4()
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model('users', UserSchema)
