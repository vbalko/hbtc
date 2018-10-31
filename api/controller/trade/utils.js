const ts2Model = require('../../tickers2/model');

// const ts2hModel = ts2Model.t2hModel;
// const ts2DataModel  = ts2Model.t2Model;
// const ts5mModel = ts2Model.t5mModel;


const util = {
	pt : async (idx) => {
		let cnt = 0;
		const headers = await ts2Model.t2hModel.find({});
		let a5mArrays = await util.passTo5minHeader(headers[idx]);
		console.log(`PT: Processing ${headers[idx].symbolExt}...`);
		// const timestamp24h = new Date("2018-10-26T22:37:18.949Z");
		//const timestamp24h = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
		//const olderTickers = await  ts2Model.t2Model.find({ symbol: headers[0].symbol, timestamp: { $lte: timestamp24h } });
		//console.log(timestamp24h);
		// console.log(a5mArrays.resArrays[0]);
		for (let a of a5mArrays['resArrays']) {
			let avTicker = util.prepareAverageTicker(a);
			//add average ticker to the db
			//TODO: add try catch to check if record already exists
			let cr5m = await ts2Model.t5mModel.create(avTicker);
			//if create was succesfull - remove source records
			if (cr5m) {
				//create array of indexes to remove
				let aRemove = a.map(item => item.timestamp);
				cnt += aRemove.length;
				let removed = await ts2Model.t2Model.deleteMany({
					symbol: a5mArrays.header.symbol,
					timestamp: { $in: aRemove }
				});
				if (removed) {
					//TODO: check
				}
			}
		}
		console.log(`Processed ${headers[idx].symbolExt}: Added ${a5mArrays["resArrays"].length} items, removed ${cnt} items.`);
	},
	passTo5min : async () => {
		let cnt = 0;
		//get all headers
		const headers = await ts2Model.t2hModel.find({});
		//process every header one by one
		for (let tickerHeader of headers) {
			console.log(`Processing ${tickerHeader.symbolExt}...`);
			//prepare arrays of tickers in 5m slices
			let a5mArrays = await util.passTo5minHeader(tickerHeader);
			//create 5m average of all values (timestamp from the 1st ticker of array)
			for (let a of a5mArrays['resArrays']) {
				//create an average ticker
				let avTicker = util.prepareAverageTicker(a);
				//add average ticker to the db
				//TODO: add try catch to check if record already exists
				let cr5m = await ts2Model.t5mModel.create(avTicker);
				//if create was succesfull - remove source records
				//remove processed tickers from 1m db (a5mArrays[tickers2remove])
				if (cr5m) {
					//create array of indexes to remove
					let aRemove = a.map(item => item.timestamp);
					cnt += aRemove.length;
					let removed = await ts2Model.t2Model.deleteMany(
						{
							symbol:	a5mArrays.header.symbol,
							timestamp: {
								$in: aRemove
							}
						}
					);
					if (removed) {
						//TODO: check
					}
				}
			}
			
			//exampleSite.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})
			console.log(`Processed ${tickerHeader.symbolExt}: added ${a5mArrays['resArrays'].length} items, removed ${cnt} items.`);
		}
	},

	prepareAverageTicker : (subArray) => {
		//prepare metadata
		const avTicker = {
			'symbol' : subArray[0].symbol,
			'timestamp' : subArray[0].timestamp,
			'ask' : 0,
			'bid' : 0,
			'last': 0,
			'open': 0,
			'low' : 0,
			'high': 0,
			'volume': 0,
			'volumeQuote': 0
		};
		//sum all respective values
		for (let a of subArray) {
			avTicker.ask += a.ask;
			avTicker.bid += a.bid;
			avTicker.last += a.last;
			avTicker.open += a.open;
			avTicker.low += a.low;
			avTicker.high += a.high;
			avTicker.volume += a.volume;
			avTicker.volumeQuote += a.volumeQuote;
		}
		//divide by number of elements a.k.a. make the average value
		const len = subArray.length;
		avTicker.ask /= len;
		avTicker.bid /= len;
		avTicker.last /= len;
		avTicker.open /= len;
		avTicker.low /= len;
		avTicker.high /= len;
		avTicker.volume /= len;
		avTicker.volumeQuote /= len;
		//return average ticker
		return avTicker;
	},
	passTo5minHeader : async (header) => {
		//select all tickers older than 24 hours
		//compute timestamp - 24h
		const timestamp24h = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
		const olderTickers = await ts2Model.t2Model.find({symbol:header.symbol, timestamp : {$lte : timestamp24h}},{},{timestamp:'asc'});
		//get tickers from last 5 mins and compute average
		//create subarrays containing tickers in 5 min slices
		const resArrays = []; //result array of 5 min subarrays
		let resSubarray = []; //subarray of tickers within 5 min slice
		let tickers2remove = []; //array of tickers to remove from tickers table
		let rTs = '';
		for (let ticker of olderTickers) {
			tickers2remove.push(ticker.timestamp); //store timestamp of processed ticker
			if (resSubarray.length == 0) {
				rTs = new Date(new Date(ticker.timestamp).getTime() + (5 * 60 * 1000)); //store timestamp of end of ticker of 5 min slice
			}
			if (ticker.timestamp <= rTs) {
				resSubarray.push(ticker);
			} else {
				resArrays.push(resSubarray);
				resSubarray = [];
				resSubarray.push(ticker);
			}
		}
		//last subarray (probably incomplete) will not be added to resArrays (array for further processing)
		// resArrays.push(resSubarray);
		return {
			'header':header,
			'resArrays':resArrays,
			'tickers2remove':tickers2remove
		};
	}

};

module.exports = util;