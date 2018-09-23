const tickersModel = require('./model');
//const tickerController = require('./controller');


const util = {
	processTickers : async (tickers) => {
		const oDoge = tickers.filter(ticker => ticker.symbol == 'DOGEETH');
		//console.log('doge: ',oDoge);
		await util.processOneTicker(oDoge[0]);
	},
	
	processOneTicker : async (ticker) => {
		//look if record with actual symbol is in db
		try {
			const fromDb = await tickersModel.findOne({ symbol: ticker.symbol });
			console.log('fromDb: ',fromDb);
			if (fromDb) {
				console.log('!!!Symbol ', ticker.symbolExt, ' existuje v db');
			} else {
				console.log('err: neexistuje v db ', ticker.symbolExt, ' Vytvarim novy zaznam.');
				//if it does not exist create one
				const fromDbCr = await tickersModel.create(util.convertToDBTicker(await ticker));
				if (fromDbCr) {
					console.log('!!!Symbol ', fromDbCr.symbolExt, ' vytvoreny v db');
				}
			}
		} catch (err) {
			console.log('err: Chyba vytvoreni zaznamu v db ', ticker.symbolExt, ' ', err);
	
		}
		
	},

	convertToDBTicker : (ticker) => {
		console.log('ticker input: ',ticker);
		const oRow = {};
		oRow.ask = ticker.ask;
		oRow.bid = ticker.bid;
		oRow.last = ticker.last;
		oRow.open = ticker.open;
		oRow.low = ticker.low;
		oRow.high = ticker.high;
		oRow.volume = ticker.volume;
		oRow.volumeQuote = ticker.volumeQuote;
		oRow.timestamp = ticker.timestamp;

		const oT = {};
		oT.symbol = ticker.symbol;
		oT.symbolExt = ticker.symbolExt;
		oT.lastTickerTimestamp = ticker.timestamp;
		oT.dataRaw = [];
		oT.dataRaw.push(oRow);
		
		console.log('tickers: ',oT);

		return oT;
	}
};

module.exports = util;