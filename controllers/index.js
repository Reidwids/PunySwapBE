const axios = require("axios")
const Bookmark = require('../models/Bookmark')
const Swap = require('../models/Swap')

exports.index_get = (req, res, next) => {
	res.render('index', { title: 'Express' });
};

exports.allCoins_get = (req, res, next) =>{
	axios({
		method: 'get',
		url: 'https://api.coinranking.com/v2/coins',
		withCredentials: true,
		headers:{
			"x-access-token": `coinrankinga10ae712cc7e766112b2cfc7f72a88480535ea9e834717c3`,
		}
	}).then((result) => {
		return res.json(result.data)
	}).catch((err) => {
		console.log(err)
		return res.json({"error": err})
	});
}


exports.coinData_get = (req, res, next) =>{ 
	axios({
		method: 'get',
		url: `https://api.coinranking.com/v2/coins?timePeriod=${req.body.time}&symbols[]=${req.body.symbol}&search=${req.body.name}`,
		withCredentials: true,
		headers:{
			"x-access-token": `coinrankinga10ae712cc7e766112b2cfc7f72a88480535ea9e834717c3`,
		}
	}).then((result) => {
		console.log(result.data)
		return res.json(result.data)
	}).catch((err) => {
		console.log(err)
		return res.json({"error": err})
	});
}

exports.addSwap_post = (req, res, next) =>{
	let {crypto1 , crypto2, owner} = req.body
	
}

exports.addBookmark_post = (req, res, next) =>{
	let {crypto, owner} = req.body
	Bookmark.findOne({crypto: crypto}, (error, bookmark)=>{
		console.log(error),
		console.log(bookmark)
	})
}