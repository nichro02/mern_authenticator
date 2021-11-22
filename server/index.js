//require express
const express = require('express')
const app = express()

//import models
const User = require('./models/user.model')

//set up cors
const cors = require('cors')
app.use(cors())

//hook up mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mern-authenticator')

//json middleware
app.use(express.json())

//stub out test route
app.get('/hello', (req, res) => {
    res.send('Hello World')
})

//POST route for registering a new user
app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status: 'ok'})
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'There was an error creating the user'})
    }
    
})

//POST route for logging in existing user
app.post('/api/login', async (req, res) => {
    try {
        await User.findOne({
            email: req.body.email,
            password: req.body.password
        })
        res.json({ status: 'ok'})
    } catch (error) {
        res.json({ status: 'error', error: 'Error logging user in. Verify name and password or sign up as a new user'})
    }
})

app.listen(1337, () => {
    console.log('Listening on port 1337')
})