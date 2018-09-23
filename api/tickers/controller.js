const tickers = require('./model');
const notFound = require('../../services/response').notFound;
const success = require('../../services/response').success;

const handle = {
	create: ({body}, res, next) =>
		tickers.create(body)
			.then(item => item.view(true))
			.then(success(res,201))
			.catch(next),

	show: ({params},res, next) =>
		tickers.findOne({id: params.id})
			.then(notFound(res))
			.then(item => item ? item.view() : null)
			.then(success(res))
			.catch(next),

	update: ({body,params}, res, next) =>
		tickers.findOne({id: params.id})
			.then(notFound(res))
			.then(item => item ? Object.assign(item,body).save() : null)
			.then(item => item ? item.view(true) : null)
			.then(success(res))
			.catch(next),
};

module.exports = handle;