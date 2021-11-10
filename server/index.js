//require express
const express = require('express')
const app = express()

//stub out test route
app.get('/hello', (req, res) => {
    res.send('Hello World')
})

app.listen(1337, () => {
    console.log('Listening on port 1337')
})