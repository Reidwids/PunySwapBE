const axios = require("axios")

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
		console.log(result)
		return res.json(result.data)
	}).catch((err) => {
		console.log(err)
		return res.json({"error": err})
	});
}
