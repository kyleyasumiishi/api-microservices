const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const auth = require('../controllers/auth');

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });
})
router.post('/signup', users.createUser);

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
})
router.post('/login', auth.loginUser);



// create - this will be integrated into signup once auth created
router.route('/test')
  .get(users.getUsers)
  .post(users.createUser);

router.route('/test/:id')
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUserById);





module.exports = router;
