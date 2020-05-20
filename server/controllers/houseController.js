module.exports = {
    getHousesByLinked: async (req,res) => {
        try {
            db = req.app.get('db')
            if (req.session.user) {
                const houses = await db.houses.get_houses_by_linked(req.session.user.user_id)
                res.status(200).send(houses)
            }
        } catch (error) {
            console.log('Error getting houses by link.', error)
            res.status(500).send(error)
        }
    },addHouse: async (req,res) => {
        try {
            db = req.app.get('db')
            if (req.session.user) {
                const {address, city, state, zipcode, rent, status, image, ownership} = req.body
                const house = await db.houses.add_house(address, city, state, zipcode, rent, status, image, req.session.user.user_id, ownership)
                res.status(200).send(house)
            }
        } catch (error) {
            console.log('Error adding house.', error)
            res.status(500).send(error)
        }
    }
}