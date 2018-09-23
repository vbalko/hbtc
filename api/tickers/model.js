const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const dateProcess = (v) => {
// 	return (new Date(v) <= new Date('2001-01-01 00:00:00')) ? undefined : v;
// };

const tickersSchema = new Schema({
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
	},
	dataRaw: [
		{
			ask: Number,
			bid: Number,
			last: Number,
			open: Number,
			low: Number,
			high: Number,
			volume: Number,
			volumeQuote: Number,
			timestamp: Date
		}
	],

}, {
	toObject: { getters: true },
	toJSON: { getters: true },
	timestamps: true
});

// tickersSchema.statics.random = function() {
// 	return this.count()
// 		.then(function(count) {
// 			var rand = Math.floor(Math.random() * count);
// 			return (this.findOne().skip(rand).exec().then(function(doc) { return doc; }));
// 		})
// 		.catch( function(err) { return err;});
// };

tickersSchema.methods = {
	view(full) {
		let view = {};
		let fields = ['symbolExt', 'dataRaw.last'];

		if (full) {
			//fields = [...fields, "desc", "rating", "createdAt"];
			return this;
		}

		fields.forEach((field) => { view[field] = this[field]; });

		return view;
	},
	random() {
		this.count()
			.then(function (count) {
				var rand = Math.floor(Math.random() * count);
				this.findOne().skip(rand).then(function (doc) { return doc; });
			})
			.catch(function (err) { return err.message; });
	}
};

const model = mongoose.model('Tickers', tickersSchema);

exports.schema = model.schema;
module.exports =  model;