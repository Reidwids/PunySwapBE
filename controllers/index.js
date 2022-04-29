const axios = require('axios');
const { $where } = require('../models/Bookmark');
const Bookmark = require('../models/Bookmark');
const Swap = require('../models/Swap');
const User = require('../models/User');
const { use } = require('../routes');

exports.index_get = (req, res, next) => {
	res.render('index', { title: 'Express' });
};

exports.allCoins_get = (req, res, next) => {
	axios({
		method: 'get',
		url: 'https://api.coinranking.com/v2/coins',
		withCredentials: true,
		headers: {
			'x-access-token': `coinrankinga10ae712cc7e766112b2cfc7f72a88480535ea9e834717c3`,
		},
	})
		.then((result) => {
			return res.json(result.data);
		})
		.catch((err) => {
			console.log(err);
			return res.json({ error: err });
		});
};

exports.coinData_get = (req, res, next) => {
	axios({
		method: 'get',
		url: `https://api.coinranking.com/v2/coins?timePeriod=${req.body.time}&symbols[]=${req.body.symbol}&search=${req.body.name}`,
		withCredentials: true,
		headers: {
			'x-access-token': `coinrankinga10ae712cc7e766112b2cfc7f72a88480535ea9e834717c3`,
		},
	})
		.then((result) => {
			return res.json(result.data);
		})
		.catch((err) => {
			return res.json({ error: err });
		});
};

exports.addSwap_post = (req, res, next) => {
	let { crypto1, crypto2, owner } = req.body;
	Swap.findOne({ crypto1: crypto1, crypto2: crypto2 }, (error, swap) => {
		let newSwap = null;
		if (swap) {
			swap.owner.push(owner);
			swap.save();
		} else {
			newSwap = new Swap(req.body);
			newSwap.save();
		}
		if (!error) {
			User.findByIdAndUpdate(owner, { $push: { swapBookmark: swap ? swap : newSwap } }, (user) => {
				return res.json({ message: 'Added Swap' });
			});
		}
	});
};

exports.removeSwap_post = (req, res, next) => {
	let { crypto1, crypto2, owner } = req.body;
	Swap.findOne({ crypto1, crypto2 })
		.then((swap) => {
			Swap.findByIdAndDelete(swap._id)
				.then((response) => {
					res.json('Swap Deleted');
				})
				.catch((error) => {
					console.log(error);
				});
		})
		.catch((error) => {
			console.log(error);
		});
};

exports.addBookmark_post = (req, res, next) => {
	let { crypto, owner } = req.body;
	console.log(crypto, owner);
	Bookmark.findOne({ crypto: crypto }, (error, bookmark) => {
		let newBookmark = null;
		if (bookmark) {
			bookmark.owner.push(owner);
			bookmark.save();
		} else {
			newBookmark = new Bookmark(req.body);
			newBookmark.save();
		}
		if (!error) {
			User.findByIdAndUpdate(owner, { $push: { cryptoBookmark: bookmark ? bookmark : newBookmark } }, (user) => {
				return res.json({ message: 'Added Bookmark' });
			});
		}
	});
};

exports.removeBookmark_post = (req, res, next) => {
	let { crypto, owner } = req.body;
	Bookmark.findOneAndUpdate(
		{ crypto: crypto },
		{
			$pullAll: {
				owner: [{ _id: owner }],
			},
		},
		(err, bookmark) => {
			User.findByIdAndUpdate(
				owner,
				{
					$pullAll: {
						cryptoBookmark: [{ _id: bookmark._id }],
					},
				},
				(err, user) => {
					res.json({ message: 'Removed Bookmark' });
				}
			).populate('cryptoBookmark');
		}
	).populate('owner');
};

exports.isBookMarked_post = (req, res, next) => {
	let { crypto, user } = req.body;
	Bookmark.findOne({ crypto: crypto }, (err, bookmark) => {
		User.findOne({ _id: user, cryptoBookmark: { $in: [bookmark] } }, (err, user) => {
			return user ? res.json(true) : res.json(false);
		});
	});
};

exports.swapIsBookMarked_post = (req, res, next) => {
	let { crypto1, crypto2, user } = req.body;
	Swap.findOne({ crypto1: crypto1, crypto2: crypto2 }, (err, swap) => {
		User.findOne({ _id: user, swapBookmark: { $in: [swap] } }, (err, user) => {
			return user ? res.json(true) : res.json(false);
		});
	});
};

exports.usersSwaps_get = (req, res, next) => {
	User.findOne({ _id: req.query.userId })
		.populate('swapBookmark')
		.then((user) => {
			return res.json(user.swapBookmark);
		});
};
