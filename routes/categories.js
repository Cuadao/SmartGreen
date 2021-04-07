//require express to enable routing
const express = require('express')
const router = express.Router()

/*MODEL for CRUD CREATE VARIABLE */
const Category = require('../models/category')

//passport to show when user is login
const passport = require('passport')

//security function
function isLoggedIn(req,res,next){
    if (req.isAuthenticated()){
        return next()
    }
    else {
        res.redirect('/login') //go login to anonymus
    }
}


/* Get /categories Show all categories but i dont show it*/
router.get('/',  (req, res, next) => {
    //Show all projects
    Category.find((err, categories) => {
        if (err) {
            console.log(err)
        }
        else{
            //load index view pass title and data from projects
            res.render('categories', {
                title: 'Categories',
                categories: categories
            })
        }
    })
})

/* GET /categories/add */
router.get('/add', isLoggedIn, (req, res, next) => {
    res.render('categories/add', {
        title: 'Add a Category',
        user: req.user
    })
})

/*POST /categories/add */
router.post('/add', isLoggedIn, (req, res, next) => {
    Category.create({
        catName: req.body.catName,
        catDesc: req.body.catDesc
    }, (err, newProject) => {
        if (err){
            console.log(err)
        }
        else {
            //is complete redirect to projects index
            res.redirect('/categories')
        }
    })
})

//make public
module.exports = router;