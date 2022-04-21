var express = require('express');
var router = express.Router();
const authCtrl = require('../controllers/auth');
const { body } = require('express-validator');

router.post(
	'/auth/signup',
	[
		body('firstName')
			.isLength({ min: 2 })
			.withMessage('First Name must be at least 2 chars long')
			.notEmpty()
			.withMessage('Firstname cannot be null'),
		body('lastName').isLength({ min: 2 }),
		body('emailAddress').isEmail(),
		body('password').isLength({ min: 6 }),
	],
	authCtrl.auth_signup_post
);
router.post('/auth/signin', authCtrl.auth_signin_post);
module.exports = router;
