//
const express = require('express')
const router = express.Router()

/* Get /projects */
router.get('/',  (req, res, next) => {
    res.render('projects/index', { title: 'Projects'})
})

//make public
module.exports = router;