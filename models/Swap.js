const mongoose = require('mongoose');

const swapSchema = mongoose.Schema({
	crypto1: {
		type: String,
		required: true,
	},
	crypto1Img: {
		type: String,
		required: true,
	},
	crypto2: {
		type: String,
		required: true,
	},
	crypto2Img: {
		type: String,
		required: true,
	},
	chain: {
		type: String,
		required: true,
	},
	owner: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

const Swap = mongoose.model('Swap', swapSchema);

module.exports = Swap;
