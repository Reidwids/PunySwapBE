const axios = require("axios")
const Bookmark = require('../models/Bookmark')
const Swap = require('../models/Swap')
const User = require('../models/User')

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
		return res.json(result.data)
	}).catch((err) => {
		return res.json({"error": err})
	});
}

exports.addSwap_post = (req, res, next) =>{
	let {crypto1 , crypto2, owner} = req.body
	Swap.findOne({crypto1: crypto1, crypto2: crypto2}, (error, swap)=>{
		let newSwap = null
		if(swap){
			swap.owner.push(owner)
			swap.save();
		}
		else{
			newSwap = new Swap(req.body)
			newSwap.save()
		}
		if(!error){
			User.findByIdAndUpdate(owner, {$push: {swapBookmark: swap?swap:newSwap}}, (user)=>{
				return res.json({"message": "Added Swap"})
			})
		}
	})
}


exports.removeSwap_post = (req, res, next) =>{
	let {crypto1, crypto2, owner} = req.body
	Swap.findOneAndUpdate({crypto1: crypto1, crypto2: crypto2},{
		$pullAll:{
			owner: [{_id: owner}]
		}
	}, (err, swap)=>{
		User.findByIdAndUpdate(owner, {
			$pullAll:{
				swapBookmark: [{_id: swap._id}]
			}
		},(err, user)=>{
			res.json({"message": "Removed Swap"})
		}).populate("swapBookmark")
	}).populate("owner")

}



exports.addBookmark_post = (req, res, next) =>{
	let {crypto, owner} = req.body
	console.log(crypto, owner)
	Bookmark.findOne({crypto: crypto}, (error, bookmark)=>{
		let newBookmark = null
		if(bookmark){
			bookmark.owner.push(owner)
			bookmark.save();
		}
		else{
			newBookmark = new Bookmark(req.body)
			newBookmark.save()
		}
		if(!error){
			User.findByIdAndUpdate(owner, {$push: {cryptoBookmark: bookmark?bookmark:newBookmark}}, (user)=>{
				return res.json({"message": "Added Bookmark"})
			})
		}
		
	})
}

exports.removeBookmark_post = (req, res, next) =>{
	let {crypto, owner} = req.body
	Bookmark.findOneAndUpdate({crypto: crypto},{
		$pullAll:{
			owner: [{_id: owner}]
		}
	}, (err, bookmark)=>{
		User.findByIdAndUpdate(owner, {
			$pullAll:{
				cryptoBookmark: [{_id: bookmark._id}]
			}
		},(err, user)=>{
			res.json({"message": "Removed Bookmark"})
		}).populate("cryptoBookmark")
	}).populate("owner")

}