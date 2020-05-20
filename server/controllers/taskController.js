module.exports = {
    getTasksByHouse: async (req,res) => {
        try {
            db = req.app.get('db')
            // console.log(req.params.id)
            if (req.session.user) {
                const tasks = await db.tasks.get_tasks_by_house(req.params.id)
            res.status(200).send(tasks)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error getting tasks by house ID.', error)
            res.status(500).send(error)
        }
    },
    addTask: async (req,res) => {
        try {
            db = req.app.get('db')
            if (req.session.user) {
                // console.log(req.body)
                const {userId, houseId,type,date,price,urgent,note,contact} = req.body
                const task = await db.tasks.add_task(userId,houseId,type,date,price,urgent,note,contact)
                res.status(200).send(task)
            } else {
                res.status(401).send('User not logged in.')
            }
        } catch (error) {
            console.log('Error adding task.', error)
            res.status(500).send(error)
        }
    },
    deleteTask: async (req,res) => {
        try {
            db = req.app.get('db')
            if (req.session.user) {
                const tasks = await db.tasks.delete_task(req.params.id)
                res.status(200).send(tasks)
            }
        } catch (error) {
            console.log('Error deleting task.', error)
            res.status(500).send(error)
        }
    }
}