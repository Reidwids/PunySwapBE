const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = (req, res, next) => {
	//Token from Auth header
	let authorizationToken = req.header('Authorization');
	console.log(authorizationToken);
	authorizationToken = authorizationToken.replace('Bearer ', '');
	console.log(authorizationToken);
	const token = authorizationToken;

	////Token from header
	// const token = req.header('x-auth-token');
	// console.log(token);
	if (!token) {
		return res
			.json({
				message: 'Not permitted to view page!',
			})
			.status(400);
	}
	try {
		const decoded = jwt.verify(token, process.env.secret);
		req.user = decoded.user;
		next();
	} catch (error) {
		return res.json({ message: 'Invalid token!' });
	}
};
