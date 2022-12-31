const Resource = require('resources.js')

class UserResource extends Resource
{
    toArray() {
        return {
            id: this._id || null,
            full_name: this.full_name || null,
            email: this.email || null,
            created_at: this.created_at || null
        };
    }
}

module.exports = UserResource
