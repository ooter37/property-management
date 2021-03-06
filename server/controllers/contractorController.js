module.exports = {
    getContractorsByUser: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const contractors = await db.contractors.get_contractors_by_user(req.session.user.user_id)
                res.status(200).send(contractors)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error getting contractors by user ID.', error)
            res.status(500).send(error)
        }
    },
    addContractor: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const userId = req.session.user.user_id
                const {name,email,address,city,state,zipcode,phone,services} = req.body
                const contractor = await db.contractors.add_contractor(userId,name,email,address,city,state,zipcode,phone,services)
                res.status(200).send(contractor)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error adding new contractor.', error)
            res.status(500).send(error)
        }
    },
    // addNewContractor: async (req,res) => {
    //     try {
    //         const db = req.app.get('db')
    //         if (req.session.user) {
    //             const userId = req.session.user.user_id
    //             const {name,email,address,city,state,zipcode,phone} = req.body
    //             const contractor = await db.contractors.add_new_contractor(userId,name,email,address,city,state,zipcode,phone)
    //             res.status(200).send(contractor)
    //         } else {
    //             res.status(401).send('User not logged in.')
    //         }
    //     } catch (error) {
    //         console.log('Error adding new contractor.', error)
    //         res.status(500).send(error)
    //     }
    // },
    deleteContractor: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const contractor = await db.contractors.delete_contractor(req.params.id)
                res.status(200).send(contractor)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error deleting contractor.', error)
            res.status(500).send(error)
        }
    },
    updateContractor: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const {id,name,email,phone,address,city,state,zipcode,services} = req.body
                const contractor = await db.contractors.update_contractor(id,name,email,phone,address,city,state,zipcode,services)
                res.status(200).send(contractor)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error updating contractor.', error)
            res.status(500).send(error)
        }
    }
}