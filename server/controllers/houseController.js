const axios = require('axios')
const aws = require('aws-sdk');
require('dotenv').config()
const {S3_BUCKET} = process.env

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
    },
    addHouse: async (req,res) => {
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
    },
    updateHouse: async (req,res) => {
        try {
            db = req.app.get('db')
            // if (req.session.user) {
                console.log(req.body)
                const {houseId,newAddress,newCity,newState,newZipcode,newRent,newStatus} = req.body
                const house = await db.houses.update_house(houseId,newAddress,newCity,newState,newZipcode,newRent,newStatus)
                res.status(200).send(house)
            // }
        } catch (error) {
            console.log('Error updating house.', error)
            res.status(500).send(error)
        }
    },
    uploadFile: (req,res) => {
        const s3 = new aws.S3();  // Create a new instance of S3
        const fileName = req.body.fileName;
        // console.log(req.session.user)
        // const fileName = req.session.user
        const fileType = req.body.fileType;
      // Set up the payload of what we are sending to the S3 api
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: `house_images/${fileName}`,
            Expires: 500,
            ContentType: fileType,
            ACL: 'public-read'
        };
        // Make a request to the S3 API to get a signed URL which we can use to upload our file
        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
            console.log(err);
            res.json({success: false, error: err})}
            // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
            const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`};
            // Send it all back
            res.json({success:true, data:{returnData}});
        })
    },
    updateImage: async (req, res) => {
        try {
            db = req.app.get('db')
            if (req.session.user) {
                const {id} = req.params
                const {fileName} = req.body
                const imageName = `https://property-management-images.s3-us-west-1.amazonaws.com/house_images/${fileName}`
                const image = await db.houses.update_house_image(imageName,id)
                res.status(200).send(image)
            }
        } catch (error) {
            console.log('Error updating image.', error)
            res.status(500).send(error)
        }
    }
}