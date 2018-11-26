const model = require('./model');
const logger = require('../../services/winston');

const util = {
	processTickers: async tickers => {
		for (let ticker of tickers) {
			await util.processOneTicker(ticker);
		}
		logger.info(`${new Date()} Zpracovano ${tickers.length} zaznamu.`);
	},
	processOneTicker: async ticker => {
		//look if record with actual symbol is in db
		try {
			const tickerHeaderDb = await model.t2hModel.findOne({
				symbol: ticker.symbol
			});
			if (tickerHeaderDb) {
				// check timestamp if update is necessary.
				if (
					new Date(tickerHeaderDb.lastTickerTimestamp) <
					new Date(ticker.timestamp)
				) {
					//update timestamp on header
					const oUpdateRes = await model.t2hModel.updateOne(
						{ symbol: ticker.symbol },
						{ lastTickerTimestamp: ticker.timestamp }
					);
					// if (oUpdateRes) {

					// }
					//create new record in t2
					const fromDBCr = await model.t2Model.create(
						util.convertToT2Data(await ticker)
					);
					// if (fromDBCr) {

					// }
				}
			} else {
				logger.info(
					'err: neexistuje v db ',
					ticker.symbolExt,
					' Vytvarim novy zaznam.'
				);
				//if it does not exist create one
				const fromDBCr = await model.t2hModel.create(
					util.convertToDBT2H(await ticker)
				);
				// if (fromDBCr) {

				// }
				const fromDBCrData = await model.t2Model.create(
					util.convertToT2Data(await ticker)
				);
				// if (fromDBCr) {

				// }
			}
		} catch (err) {
			logger.error(
				'err: Chyba vytvoreni zaznamu v db ',
				ticker.symbolExt,
				' ',
				err
			);
		}
	},

	//Converts whole HitBTC ticker data to DB format
	convertToDBT2H: ticker => {
		//adds metadata
		const oT = {};
		oT.symbol = ticker.symbol;
		oT.symbolExt = ticker.symbolExt;
		oT.lastTickerTimestamp = ticker.timestamp;
		return oT;
	},
	//Converts HitBTC ticker bussiness data do DB format
	convertToT2Data: ticker => {
		const oRow = {};
		oRow.symbol = ticker.symbol;
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
	},

	//get 1m tickers of one symbol
	get1mTickersBySymbol: async symbol => {
		try {
			const tickersDb = await model.t2Model.find({ symbol: symbol },{},{sort:{timestamp:-1},limit:0});
			if (tickersDb) {
				return tickersDb.map(item => item.view(true));
			}
		} catch (err) {
			logger.error(`err: Chyba ziskani tickeru pro symbol ${symbol}. ${JSON.stringify(err)} `);
		}
	}
};

module.exports = util;
