const router = require('express').Router();
const user = require('../users/users.controller');

router.route('/registration').post(user.registrationUser);
router.route('/login').post(user.loginUser);

module.exports = router;
