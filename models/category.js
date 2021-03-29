//references to mongoose
const mongoose = require('mongoose')

const categorySquema = new mongoose.Schema( {
    catName: {
        type: String,
        required: true
    },
    catDesc: {
        type: String,
        required: true
    }
})

//export the schema  visible to controller or routes
module.exports = mongoose.model('Category', categorySquema)