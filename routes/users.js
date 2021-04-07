var express = require('express');
var router = express.Router();
const User = require('../models/user')
const Role = require('../models/role')
/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

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

/*GET USERS*/
router.get('/', function(req, res, next) {
  /*All Users*/
  User.find((err, user) => {
  if (err) {
    console.log(err)
  }
  else{
    //load index view pass title and data from projects
    res.render('users', {
      title: 'users',
      users: user,
      user: req.user
    })
  }
})
})

/*Get /User/edit */

router.get('/edit/:_id', isLoggedIn, (req, res, next) => {
  User.findById(req.params._id, (err, user) => {
    if (err) {
      console.log(err)
    }
    else {
      //get courses dropdown
      Role.find((err, role) => {
        if (err) {
          console.log(err)
        }
        else {
          res.render('users/edit', {
            title: 'User Details',
            users: user,
            role: role,
            user: req.user
          })
        }
      }).sort({ role: 1})
    }
  })
})



//POST /projects/edit send
router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
  User.findOneAndUpdate({ _id: req.params._id }, {
    username: req.body.username,
    role: req.body.role
  }, (err, users) => {
    if (err) {
      console.log(err)
    }
    else {
      res.redirect('/users')
    }
  })
})

/*Get /users/delete */
router.get('/delete/:_id', isLoggedIn,(req, res, next) => {
  //user model to delete
  User.remove({ _id: req.params._id }, (err) => {
    if (err){
      console.log(err)
    }
    else{
      res.redirect('/users')
    }
  })
})

module.exports = router;
