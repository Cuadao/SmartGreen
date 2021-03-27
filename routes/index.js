var express = require('express');
var router = express.Router();

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

module.exports = router;
