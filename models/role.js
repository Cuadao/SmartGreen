//references to mongoose
const mongoose = require('mongoose')

//Model to manage users
const plm = require('passport-local-mongoose')

//Create Schema
const roleSchema = new mongoose.Schema( {
    roleName: String,
    description: String
})

//special auth model
roleSchema.plugin((plm))

//export the schema  visible to controller or routes
module.exports = mongoose.model('Role', roleSchema)