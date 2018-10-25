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
		}
	}
};

module.exports = api;