module.exports = {
    getRentersByUser: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const renters = await db.renters.get_renters_by_user(req.session.user.user_id)
                res.status(200).send(renters)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error getting renters by user ID.', error)
            res.status(500).send(error)
        }
    },
    addRenter: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const userId = req.session.user.user_id
                const {houseId,name,email,phone} = req.body
                const renter = await db.renters.add_renter(userId,houseId,name,email,phone)
                res.status(200).send(renter)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error adding new renter.', error)
            res.status(500).send(error)
        }
    },
    deleteRenter: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const renter = await db.renters.delete_renter(req.params.id)
                res.status(200).send(renter)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error deleting renter.', error)
            res.status(500).send(error)
        }
    },
    updateRenter: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const {id,houseId,name,email,phone,primary} = req.body
                const renter = await db.renters.update_renter(id,houseId,name,email,phone)
                res.status(200).send(renter)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error updating renter.', error)
            res.status(500).send(error)
        }
    }
}