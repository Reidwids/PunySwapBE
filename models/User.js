// Dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
			minlength: [2, 'First name must be more than 2 characters'],
			maxlength: [30, 'First name is too long'],
		},
		lastName: {
			type: String,
			required: true,
			minlength: [2, 'Last name must be more than 2 characters'],
			maxlength: [30, 'Last name is too long'],
		},
		emailAddress: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [6, 'Your password should be atleast 6 characters'],
		},
	},
	{
		timestamps: true,
	}
);

// verifyPassword
userSchema.methods.verifyPassword = function (password) {
	console.log('Creating model with pw');
	return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
