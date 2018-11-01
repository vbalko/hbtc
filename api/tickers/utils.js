const tickersModel = require('./model');
const logger = require('../../services/winston');
//const tickerController = require('./controller');


const util = {
	processTickers : async (tickers) => {
		// const oDoge = tickers.filter(ticker => ticker.symbol == 'DOGEETH');
		//console.log('doge: ',oDoge);
		// await util.processOneTicker(oDoge[0]);

		for(let ticker of tickers) {
			await util.processOneTicker(ticker);
		}
	},
	
	processOneTicker : async (ticker) => {
		//look if record with actual symbol is in db
		try {
			const tickerFromDb = await tickersModel.findOne({ symbol: ticker.symbol });
			//console.log('fromDb: ',tickerFromDb);
			if (tickerFromDb) {
				//console.log('!!!Symbol ', ticker.symbolExt, ' existuje v db - delam update');
				// check timestamp if update is necessary. 
				if (new Date(tickerFromDb.lastTickerTimestamp) < new Date(ticker.timestamp)) {
					const aDataRaw = tickerFromDb.dataRaw;
					aDataRaw.push(util.convertToTickerData(ticker));
					const oUpdateRes = await tickersModel.updateOne(
						{ symbol: ticker.symbol },
						{
							dataRaw: aDataRaw,
							lastTickerTimestamp: ticker.timestamp
						}
					);
					if (oUpdateRes) {
						//console.log('!!!Symbol ', ticker.symbolExt, ' updatovany v db');
					}					
				} else {
					//if update is not necessary
					//console.log('TS from DB: ', tickerFromDb.lastTickerTimestamp, ' TS from API: ',ticker.timestamp);
					//console.log('!!!Symbol ', ticker.symbolExt, ' neni potrebne updatovat. Stejny timestamp');
				}


			} else {
				logger.error('err: neexistuje v db ', ticker.symbolExt, ' Vytvarim novy zaznam.');
				//if it does not exist create one
				const fromDbCr = await tickersModel.create(util.convertToDBTicker(await ticker));
				if (fromDbCr) {
					//console.log('!!!Symbol ', fromDbCr.symbolExt, ' vytvoreny v db');
				}
			}
		} catch (err) {
			logger.error('err: Chyba vytvoreni zaznamu v db ', ticker.symbolExt, ' ', err);
	
		}
		
	},

	//Converts whole HitBTC ticker data to DB format
	convertToDBTicker : (ticker) => {
		//converts bussiness data
		const oRow = util.convertToTickerData(ticker);

		//adds metadata
		const oT = {};
		oT.symbol = ticker.symbol;
		oT.symbolExt = ticker.symbolExt;
		oT.lastTickerTimestamp = ticker.timestamp;
		oT.dataRaw = [];
		oT.dataRaw.push(oRow);

		return oT;
	},

	//Converts HitBTC ticker bussiness data do DB format
	convertToTickerData : (ticker) => {
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

		return oRow;
	}
};

module.exports = util;