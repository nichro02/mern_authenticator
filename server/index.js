//require express
const express = require('express')
const app = express()

//import models
const User = require('./models/user.model')

//set up jwt
const jwt = require('jsonwebtoken')

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
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password
        })

        if(user){
            /*console.log(user.email)*/
            const token = jwt.sign({
                email: user.email
            }, 'secret123')
            res.json({ status: 'ok', user: token})
        }
        
    } catch (error) {
        //console.log(user.email)
        res.json({ status: 'error', error: 'Error logging user in. Verify name and password or sign up as a new user'})
    }
})

//get token from login
app.get('/api/quote', async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        const user = await User.findOne({email: email})
        return { status: 'ok', quote: user.quote}
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
    
})

app.post('/api/quote', async(req, res) => {
    const token = req.headers['x-access-token']
    try {
        const decoded = jwt.verify(token, 'secret123')
        const email = decoded.email
        await User.updateOne({email: email}, {$set: {quote: req.body.quote}})
        return { status: 'ok'}
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
    
})

app.listen(1337, () => {
    console.log('Listening on port 1337')
})