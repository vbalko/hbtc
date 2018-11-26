const hitBTC = require('../services/exchanges/hitbtc');
const tickers = require('./tickers2/utils');
const logger = require('../services/winston');

const oHitBTC = new hitBTC();

const api = {
	utils : {
		/*
		* service used for syncing regularly
		*/
		refreshTickers : async () => {
			logger.info('Zpracovavam tickery');
			await oHitBTC.processTickers(1);
		},
		/*
		* service used for syncing regularly
		*/
		refreshTickers2: async () => {
			logger.info(`${new Date()} Zpracovavam tickery 2`);
			await oHitBTC.processTickers(2);
		},
		
		/*
		* return one ticker symbol
		*/
		get1mTickersBySymbol: async symbol => {
			return tickers.get1mTickersBySymbol(symbol);
		},

		/*
		* test method
		*/
		test: async () => {
			logger.info(`Test...`);
			return await tickers.get1mTickersBySymbol('DOGEETH');
		}
	}
};

module.exports = api;