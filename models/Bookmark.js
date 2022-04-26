const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema({
	crypto: {
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

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
