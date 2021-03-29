//require express to enable routing
const express = require('express')
const router = express.Router()

/*MODEL for CRUD CREATE VARIABLE */
const Category = require('../models/category')

/* Get /categories
router.get('/',  (req, res, next) => {
    //Show all projects
    Category.find((err, categories) => {
        if (err) {
            console.log(err)
        }
        else{
            //load index view pass title and data from projects
            res.render('categories/index', {
                title: 'Categories',
                categories: categories
            })
        }
    })
})*/

/* GET /categories/add */
router.get('/add', (req, res, next) => {
    res.render('categories/add', { title: 'Add a Category'})
})

/*POST /categories/add */
router.post('/add', (req, res, next) => {
    Category.create({
        catName: req.body.catName,
        catDesc: req.body.catDesc
    }, (err, newProject) => {
        if (err){
            console.log(err)
        }
        else {
            //is complete redirect to projects index
            res.redirect('/')
        }
    })
})

//make public
module.exports = router;