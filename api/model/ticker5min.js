const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticker5mSchema = new Schema(
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

const ticker5mModel = mongoose.Model('Ticker5m',ticker5mModel);

exports.t5mModel = ticker5mModel;
exports.t5mSchema = ticker5mSchema;
module.exports = ticker5mSchema;