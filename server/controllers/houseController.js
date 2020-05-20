const axios = require('axios')

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
                const {address, city, state, zipcode, rent, status, ownership} = req.body
                const googleResult = await axios.get(`https://maps.googleapis.com/maps/api/streetview/metadata?location=${(`${address},+${city},+${state}`).replace(/\s/g,',+')}&key=${process.env.REACT_APP_GOOGLE}`)
                let image
                if (googleResult.data.location) {
                    image = (`https://maps.googleapis.com/maps/api/streetview?size=300x200&location=${(`${address},+${city},+${state}`).replace(/\s/g,',+')}&key=${process.env.REACT_APP_GOOGLE}`)
                } else {
                    image = '/no-image-available.png'
                }
                const house = await db.houses.add_house(address, city, state, zipcode, rent, status, image, req.session.user.user_id, ownership)
                res.status(200).send(house)
            }
        } catch (error) {
            console.log('Error adding house.', error)
            res.status(500).send(error)
        }
    }
}