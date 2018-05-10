const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'API and Microservice Projects' });
});

// GET about page.
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
})

// Login
router.route('/auth/token')
  .post(auth.loginUser);

module.exports = router;
