const hitBTC = require('../services/exchanges/hitbtc');
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
	}
};

module.exports = api;