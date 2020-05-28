//DEPENDENCIES
require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const cors = require('cors')

//IMPORT 
const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env
const { login, register, logout, getUser, userData } = require('./controllers/authController')
const { getHousesByLinked, addHouse, uploadFile, updateImage, updateHouse, deleteHouse } = require('./controllers/houseController')
const { getTasksByHouse, addTask, deleteTask } = require('./controllers/taskController')
const { getContractorsByUser, addNewContractor, deleteContractor, updateContractor } = require('./controllers/contractorController')
const { getRentersByUser, addNewRenter, deleteRenter, updateRenter} = require('./controllers/renterController')
const { singleEmail, multiEmail } = require('./controllers/mailController')

//TOP-LEVEL MIDDLEWARE
const app=express()
app.use(express.json())
app.use(cors())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookies: {
        maxAge: 1000*60*60*24*14
    }
}))
app.use( express.static( `${__dirname}/../build` ) );
//SERVER & DB SETUP
massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db',db)
    console.log('connected to db')
}).catch(err => console.log('error getting db', err))
app.listen(SERVER_PORT, () => console.log(`server listening on port ${SERVER_PORT}`))


//AUTH ENDPOINTS
app.post('/auth/login', login)
app.post('/auth/register', register)
app.get('/auth/logout', logout)
app.get('/auth/current', getUser)
app.get('/auth/user-data', userData)

//HOUSE ENDPOINTS
app.get('/api/houses', getHousesByLinked)
app.post('/api/houses', addHouse)
app.put('/api/houses/:id', updateImage )
app.put('/api/houses', updateHouse)
app.delete('/api/houses/:id', deleteHouse)

//TASK ENDPOINTS
app.get('/api/tasks/:id', getTasksByHouse)
app.post('/api/tasks', addTask)
app.delete('/api/tasks/:id', deleteTask)
app.post('/sign_s3', uploadFile)

//CONTRACTOR ENDPOINTS
app.get('/api/contractors', getContractorsByUser)
app.post('/api/contractors', addNewContractor)
app.delete('/api/contractors/:id', deleteContractor)
app.put('/api/contractors', updateContractor)

//RENTER ENDPOINTS
app.get('/api/renters', getRentersByUser)
app.post('/api/renters', addNewRenter)
app.delete('/api/renters/:id', deleteRenter)
app.put('/api/renters', updateRenter)

//EMAIL ENDPOINTS
// app.post('/email/single', singleEmail)
app.post('/email/multi', multiEmail)


// Configure aws with your accessKeyId and your secretAccessKey -- MIGHT NEED THIS WHEN ACCESS PRIVS ARE FIXED
// aws.config.update({
//     region: 'us-east-1', // Put your aws region here
//     accessKeyId: process.env.AWSAccessKeyId,
//     secretAccessKey: process.env.AWSSecretKey
//   })

