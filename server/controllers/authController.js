const bcrypt = require('bcrypt')

module.exports = {
    login: async (req,res) => {
        try {
            const db = req.app.get('db')
            let {email, password} = req.body
            let users = await db.auth.find_user_by_email(email)
            let user = users[0]
            if (!user) {
                return res.status(401).send('Email or password incorrect.')
            }
            let isAuthenticated = bcrypt.compareSync(password, user.hashed_password)

            if (!isAuthenticated) {
                return res.status(401).send('Email or password incorrect.')
            }
            delete user.hashed_password
            req.session.user = user
            res.send(req.session.user)
        } catch (error) {
            console.log('Error on login', error)
            res.status(500).send(error)
        }
    },
    register: async (req,res) => {
        try {
            const db = req.app.get('db')
            let {email,password} = req.body
            let users = await db.auth.find_user_by_email(email)
            .catch(err => console.log('Error find user by email.',err))
            let user = users[0]
            if (user) {
                return res.status(409).send('Email is already registered. Please login.')
            }

            const salt = bcrypt.genSaltSync(10)
            const hashedPassword = bcrypt.hashSync(password,salt)

            let response = await db.auth.create_user(email,hashedPassword)
            let newUser = response[0]

            delete newUser.hashed_password

            req.session.user = newUser
            res.send(req.session.user)
        } catch (error) {
            console.log('Error on register', error)
            res.status(500).send(error)
        }
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: (req, res) => {
        try {
            res.status(200).send(req.session.user)
        } catch (error) {
            console.log('Error getting user.', error)
            res.status(500).send(error)
        }
    },
    userData: (req,res) => {
        const {user} = req.session;
        if (user) res.status(200).send(user)
        else return res.sendStatus(401)
    }
}