const hitBTC = require('../services/exchanges/hitbtc');

const oHitBTC = new hitBTC();

const api = {
	utils : {
		/*
		* service used for syncing regularly
		*/
		refreshTickers : async () => {
			console.log('Zpracovavam tickery');
			await oHitBTC.getTickers();
		},
		/*
		* service used for syncing regularly
		*/
		refreshTickers2: async () => {
			console.log('Zpracovavam tickery 2');
			await oHitBTC.getTickers(2);
		},		
	}
};

module.exports = api;