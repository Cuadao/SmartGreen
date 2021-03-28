//
const express = require('express')
const router = express.Router()

/*MODEL for CRUD*/
const Project = require('../models/project')

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
    res.render('projects/add', { title: 'Project Details'})
})

/*POST /projects/add */
router.post('/add', (req, res, next) => {
    Project.create({
        projectName: req.body.projectName,
        ProjDesc: req.body.ProjDesc,
        projDate: req.body.projDate,
        //projStatus: req.body.projStatus,
        projCreator: req.body.projCreator
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

//make public
module.exports = router;