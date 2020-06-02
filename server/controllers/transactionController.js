module.exports = {
    addTransaction: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const userId = req.session.user.user_id
                const {houseId,amount,date, period} = req.body
                const transaction = await db.transactions.add_transaction(userId,houseId,amount,date,period)
                res.status(200).send(transaction)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error adding transaction.', error)
            res.status(500).send(error)
        }
    },
    getTransactionsByUser: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const userId = req.session.user.user_id
                const transactions = await db.transactions.get_transactions_by_user(userId)
                res.status(200).send(transactions)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error getting transactions.', error)
            res.status(500).send(error)
        }
    },
    voidTransaction: async (req,res) => {
        try {
            const db = req.app.get('db')
            if (req.session.user) {
                const transaction = await db.transactions.void_transaction(req.params.id)
                res.status(200).send(transaction)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error voiding transaction.', error)
            res.status(500).send(error)
        }
    }
    // getTransactionsByHouse: async (req,res) => {
    //     try {
    //         const db = req.app.get('db')
    //         if (req.session.user) {
    //             const userId = req.session.user.user_id
    //             const transactions = await db.transactions.get_transactions_by_user(userId)
    //             res.status(200).send(transactions)
    //         } else {
    //             res.status(401).send('User not logged in.')
    //         }
    //     } catch (error) {
    //         console.log('Error getting transactions.', error)
    //         res.status(500).send(error)
    //     }
    // },
}