const mongoose = require('mongoose')

//define user model
const User = new mongoose.Schema(
    {
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    quote: {type: String},
    },
    { collection: 'user-data'}
)

const model = mongoose.model('UserData', User)

module.exports = model