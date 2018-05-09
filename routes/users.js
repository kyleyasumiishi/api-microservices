const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

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

// create - this will be integrated into signup once auth created
router.route('/test')
  .get(users.getUsers)
  .post(users.createUser);

router.route('/test/:id')
  .get(users.getUserById)
  .put(users.updateUser)
  .delete(users.deleteUserById);





module.exports = router;
