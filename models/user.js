//references to mongoose
const mongoose = require('mongoose')

//Model to manage users
const plm = require('passport-local-mongoose')

//Create Schema
var userSchema = new mongoose.Schema( {
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

//special auth model
userSchema.plugin((plm))

//export the schema  visible to controller or routes
module.exports = mongoose.model('User', userSchema)