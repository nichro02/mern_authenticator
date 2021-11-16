//require express
const express = require('express')
const app = express()

//set up cors
const cors = require('cors')
app.use(cors())

//hook up mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017')

//json middleware
app.use(express.json())

//stub out test route
app.get('/hello', (req, res) => {
    res.send('Hello World')
})

//POST route for registration info
app.post('/api/register', (req, res) => {
    console.log(req.body)
    res.json({status: 'ok'})
})

app.listen(1337, () => {
    console.log('Listening on port 1337')
})