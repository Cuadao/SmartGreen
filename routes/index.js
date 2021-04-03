var express = require('express');
var router = express.Router();

/*User model & model for auth*/
const User = require('../models/user')
const passport = require('passport')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Smart Green' });
});

/* GET about page.*/
router.get('/about', function (req, res, next){
  res.render('about', {
    title: 'About Us',
    pageText: 'Here is what we do'
      })
});

/*GET Register */
router.get('/register', (req, res, next) => {
  res.render('register', {
    title: 'Please create an Account'
  })
})

/*POST /register*/
router.post('/register', (req, res, next) => {
  //
  User.register(new User( {
    username: req.body.username
  }), req.body.password, (err, newUser) =>{
    if (err) {
      return res.redirect('/register')
    }
    else {
      req.login(newUser, (err) => {
        res.redirect('/projects')
      })
    }
  })
})

/*GET LOGIN*/
router.get('/login', (req, res, next) => {
  //check for login error and display
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', {
    title: 'Please enter your credentials',
    messages: messages
  })
})

/*POST LOGIN*/ //Autenticate
router.post('/login', passport.authenticate('local', {
  successRedirect: '/projects',
  failureRedirect: '/login',
  failureMessage: 'Invalid Login',
}))

/*GET LOGOUT*/
router.get('/logout', (req, res, next) => {
  req.logout(),
      res.redirect('login')
})

module.exports = router;
