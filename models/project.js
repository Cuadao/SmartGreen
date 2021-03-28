//references to mongoose
const mongoose = require('mongoose')

var projectSquema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    ProjDesc: {
        type: String
    },
    projDate: {
        type: Date
    },
    projStatus: {
        type: String,
        default: 'To-Do'
    },
    projCreator: {
        type: String
    }
})

//export the schema  visible to controller or routes
module.exports = mongoose.model('Project', projectSquema)