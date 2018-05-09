var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // if logged in

  // else
  res.render('login', { title: 'Login' });
  // res.render('users', { title: 'Sign Up' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
})

module.exports = router;
