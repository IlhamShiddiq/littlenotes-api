const Resource = require('resources.js')

class UserLoggedInResource extends Resource
{
    toArray() {
        return {
            id: this.id,
            full_name: this.name,
            email: this.email
        }
    }
}

module.exports = UserLoggedInResource
