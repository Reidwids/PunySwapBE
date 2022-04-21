require('dotenv').config();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = 10;
const { validationResult } = require('express-validator');

exports.auth_signup_post = (req, res) => {
	let user = new User(req.body);
	console.log(req.body);
	let hash = bcrypt.hashSync(req.body.password, salt);
	console.log(hash);
	user.password = hash;
	user
		.save()
		.then(() => {
			res.json({ message: 'User created successfully' });
		})
		.catch((err) => {
			if (err.code == 11000) {
				res.json({ message: 'Email already exists!' });
			} else {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					res.json({
						message: 'Validation Errors',
						ValidationErrors: errors.errors,
					});
				}
			}
		});
};
exports.auth_signin_post = async (req, res) => {
	let { emailAddress, password } = req.body;
	try {
		let user = await User.findOne({ emailAddress });
		// console.log(user);

		if (!user) {
			return res.json({ message: 'User not found!' }).status(400);
		}
		const isMatch = await bcrypt.compareSync(password, user.password);
		if (!isMatch) {
			return res.json({ message: 'Password mismatched!' }).status(400);
		}
		const payload = {
			user: {
				id: user._id,
				name: user.firstName,
			},
		};
		jwt.sign(
			payload,
			process.env.secret,
			{ expiresIn: 86400000 },
			(err, token) => {
				if (err) throw err;
				res.json({ token }).status(200);
			}
		);
	} catch (error) {
		res.json({ message: 'You are not logged in!' }).status(400);
	}
};
