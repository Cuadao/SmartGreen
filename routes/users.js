var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.get('/', function(req, res, next) {
  User.find((err, users) => {
  if (err) {
    console.log(err)
  }
  else{
    //load index view pass title and data from projects
    res.render('users', {
      title: 'Users',
      users: users
    })
  }
})
});


module.exports = router;
