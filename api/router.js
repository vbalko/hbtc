const express = require('express');
const ctrl = require('./controller');
const hitbtc = require('../services/exchanges/hitbtc');

const router = new express.Router();
const oHitBTC = new hitbtc();

//ROOT
router.get('/api', async (req, res) =>
	res.json(
		await oHitBTC.getTickers()
		// await getData()
	)
);

router.get('/api/:symbol/:period', async (req, res) =>
	res.json(
		//await ctrl.utils.get1mTickersBySymbol(req.params.symbol)
		await oHitBTC.get(`candles/${req.params.symbol}?period=${req.params.period}`)
	)
);

router.get('/api/symbols', async (req,res) =>
	res.json(
		(await oHitBTC.get('symbol')).filter(s => s.baseCurrency == 'ETH' || s.quoteCurrency == 'ETH')
	)
);

// async function getData() {
// 	try {
// 		const tickers = await d3.json('https://api.hitbtc.com/api/2/public/ticker');
// 		const aSymbols = await tickers.
// 			filter((item) => item.symbol.includes('ETH')).
// 			map((item) => { item.symbol_ext = item.symbol.indexOf('ETH') == 0 ? item.symbol.replace('ETH', 'ETH/'): item.symbol.replace('ETH','/ETH');
// 				return item;});
// 		return await aSymbols;
// 	} catch (err) {
// 		const problem = 'Nepovedlo se nacist public/ticker. ';
// 		console.log('problem: ',problem+err);
// 		return {'problem':problem+err};
// 	}

// }

// var handleRoot = (req,res) => {
// // async function getRawData() {
// //     const tickers = await d3
// //       .json("https://api.hitbtc.com/api/2/public/ticker");
// //       return await tickers;
// // }
// 	return res.json({'root':'test'});
// };

module.exports = router;
