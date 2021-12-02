//require express
const express = require('express')
const app = express()

//import models
const User = require('./models/user.model')

//set up jwt
const jwt = require('jsonwebtoken')

const bcrypt=require('bcrypt')

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
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    } catch(error) {
        console.log(error)
        res.json({ status: 'error', error: 'There was an error creating the user'})
    }
    
})

//POST route for logging in existing user
app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

//get token from login
app.get('/api/quote', async(req, res) => {
    const token = req.headers['x-acess-token']
    console.log('HEADERS',req.headers)
    try {
        const decoded = jwt.verify(token, 'secret123')
        
        const email = decoded.email
        const user = await User.findOne({email: email})
        return res.json({ status: 'ok', quote: user.quote})
    } catch(error){
        console.log(error)
        res.json({status: 'error', error: 'invalid token'})
    }
    
})

app.post('/api/quote', async(req, res) => {
    const token = req.headers['x-acess-token']
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