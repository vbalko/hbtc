const d3 = require('d3-fetch');
const tickersUtils = require('../../api/tickers/utils');


class HitBTC {
	constructor() {
		if (typeof fetch !== 'function') {
			global.fetch = require('node-fetch-polyfill');
		}
		this.apiURL = 'https://api.hitbtc.com/api/2/public/';
	}

	async get(action) {
		//let dataJSON = JSON.stringify(data);
		try {
			const response = await d3.json('https://api.hitbtc.com/api/2/public/'+action);
			return await response;
		} catch (err) {
			const problem = 'Nepovedlo se nacist public/' + action + ' ';
			//eslint-disable-next-line no-console
			console.log('problem: ', problem + err);
			return { problem: problem + err };
		}		
	}

	async getTickers() {
		try {
			const tickers = await this.get('ticker');
			const aSymbols = await tickers.
				filter((item) => item.symbol.includes('ETH')).
				map((item) => {
					item.symbolExt = item.symbol.indexOf('ETH') == 0 ? item.symbol.replace('ETH', 'ETH/') : item.symbol.replace('ETH', '/ETH');
					return item;
				});
			tickersUtils.processTickers(aSymbols);
			return await aSymbols;			
		} catch (err) {
			const problem = 'Problem: hitbtc.js getTickers '+err;
			//eslint-disable-next-line no-console
			console.log('problem: ', problem);
			return { 'problem': problem };
		}
		
	}

	async tst() {
		const tickers = await this.getTickers();
		tickersUtils.processTickers(tickers);
		return await tickers;
	}
}

module.exports = HitBTC;