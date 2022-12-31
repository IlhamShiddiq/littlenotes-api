const bcrypt = require('bcrypt')
const User = require('../../models/users')
const UserResource = require('../../resources/User/UserResource')

class UserService
{
    static fetchAll = async (req, res) => {
        try {
            const users = await User.find()

            res.json({
                message: 'All users data',
                data: UserResource.collection(users)
            })
        } catch(error) {
            res.status(500).json({message: error.message})
        }
    }

    static fetchDetail = async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            user ? res.json({
                message: 'Get detail',
                data: new UserResource(user).exec()
            }) : res.status(404).json({
                message: 'Data Not Found',
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static store = async (req, res) => {
        const user = new User({
            full_name: req.body.full_name,
            email: req.body.email,
            password: await bcrypt.hash(req.body.password, 10),
        })

        try {
            const newUser = await user.save()
            res.status(201).json({
                message: 'User stored',
                data: new UserResource(newUser).exec()
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static update = async (req, res) => {
        const checkUser = await User.findById(req.params.id)
        if (!checkUser) res.status(404).json({message: 'Data not found'})

        const payload = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password,
            updated_at: Date.now()
        }

        try {
            await User.updateOne({_id: req.params.id}, payload)
            res.json({
                message: 'Data updated'
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static delete = async (req, res) => {
        try {
            await User.deleteOne({_id: req.params.id})
            res.json({
                message: 'Data deleted'
            })
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

module.exports = UserService
