//require express to enable routing
const express = require('express')
const router = express.Router()

/*MODEL for CRUD*/
const Project = require('../models/project')
//categories
const Category = require('../models/category')


/* Get /projects */
router.get('/',  (req, res, next) => {
    //Show all projects
    Project.find((err, projects) => {
        if (err) {
            console.log(err)
        }
        else{
            //load index view pass title and data from projects
            res.render('projects/index', {
                title: 'Project Details',
                projects: projects
            })
        }
    })
})

/* GET /projects/add */
router.get('/add', (req, res, next) => {
   // course model to dropdwon
    Category.find((err, categories) => {
        if (err){
            console.log(err)
        }
        else{
            res.render('projects/add',{
                title: 'Project Details',
                categories: categories
            })
        }
    }).sort({ catName: 1 })
})

/*POST /projects/add */
router.post('/add', (req, res, next) => {
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
router.get('/delete/:_id', (req, res, next) => {
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

//make public
module.exports = router;