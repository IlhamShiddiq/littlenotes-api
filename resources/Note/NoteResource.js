const Resource = require('resources.js')

class NoteResource extends Resource
{
    toArray() {
        return {
            id: this._id || null,
            title: this.title || null,
            body: this.body || null,
            is_archived: this.is_archived || false,
            created_at: this.created_at || null,
        }
    }
}

module.exports = NoteResource
