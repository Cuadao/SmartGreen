//require express to enable routing
const express = require('express')
const router = express.Router()

/*MODEL for CRUD*/
const Project = require('../models/project')
//categories
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


/* Get /projects */
router.get('/',  (req, res, next) => {
    //Show all projects
    Project.find((err, projects) => {
        if (err) {
            console.log(err)
        }
        else{
            //load index view pass title and data from projects
            //call user when login
            res.render('projects/index', {
                title: 'Project Details',
                projects: projects,
                user: req.user
            })
        }
    })
})

/* GET /projects/add */
router.get('/add', isLoggedIn, (req, res, next) => {
   // course model to dropdwon
    Category.find((err, categories) => {
        if (err){
            console.log(err)
        }
        else{
            res.render('projects/add',{
                title: 'Project Details',
                categories: categories,
                user: req.user
            })
        }
    }).sort({ catName: 1 })
})

/*POST /projects/add */
router.post('/add', isLoggedIn, (req, res, next) => {
    Project.create({
        projectName: req.body.projectName,
        ProjDesc: req.body.ProjDesc,
        projDate: req.body.projDate,
        //projStatus: req.body.projStatus,
        projCreator: req.body.projCreator,
        projCategory: req.body.projCategory,
    }, (err, newProject) => {
        if (err){
            console.log(err)
        }
        else {
            //is complete redirect to projects index
            res.redirect('/projects')
        }
    })
})

/*Get /projects/delete */
router.get('/delete/:_id', isLoggedIn,(req, res, next) => {
    //project model to delete
    Project.remove({ _id: req.params._id }, (err) => {
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/projects')
        }
    })
})

/*Get /project/edit */
router.get('/edit/:_id', isLoggedIn, (req, res, next) => {
    Project.findById(req.params._id, (err, project) => {
        if (err) {
            console.log(err)
        }
        else {
            //get category dropdown
            Category.find((err, categories) => {
                if (err) {
                    console.log(err)
                }
                else {
                       res.render('projects/edit', {
                        title: 'Project Details',
                        project: project,
                        categories: categories,
                           user: req.user
                    })
                }
            }).sort({ catName: 1})
        }
    })
})

//POST /projects/edit send
router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
    Project.findOneAndUpdate({ _id: req.params._id }, {
        projectName: req.body.projectName,
        ProjDesc: req.body.ProjDesc,
        projDate: req.body.projDate,
        projStatus: req.body.projStatus,
        projCreator: req.body.projCreator,
        projCategory: req.body.projCategory
    }, (err, project) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/projects')
        }
    })
})

//make public
module.exports = router;