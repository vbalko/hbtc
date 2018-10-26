const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticker2HeaderSchema = new Schema({
	symbol: {
		type: String,
		required: true,
		unique: true,
		index: true,
		trim: true,
		//lowercase: true
	},
	symbolExt: {
		type: String,
		// index: true,
		trim: true
	},
	lastTickerTimestamp: {
		type: Date,
	}
}, {
	toObject: { getters: true },
	toJSON: { getters: true },
	timestamps: true
});

const ticker2Schema = new Schema(
	{
		symbol: {
			type: String,
			required: true,
			index: true,
			trim: true
		},
		ask: Number,
		bid: Number,
		last: Number,
		open: Number,
		low: Number,
		high: Number,
		volume: Number,
		volumeQuote: Number,
		timestamp: Date
	},
	{
		toObject: { getters: true },
		toJSON: { getters: true },
		//timestamps: true
	}
);

const ticker2HeaderModel = mongoose.model('Ticker2Header',ticker2HeaderSchema);
const ticker2Model       = mongoose.model('Ticker2', ticker2Schema);

exports.t2hSchema = ticker2HeaderModel.schema;
exports.t2Schema  = ticker2Model.schema;
exports.t2hModel  = ticker2HeaderModel;
exports.t2Model   = ticker2Model;

