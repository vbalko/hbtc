const mongoose = require('mongoose');

const mongo = require('../../config').mongo;

Object.keys(mongo.options).forEach((key) => {
	mongoose.set(key,mongo.options[key]);
});

//mongoose.Promise = Promise
/* istanbul ignore next */
mongoose.Types.ObjectId.prototype.view = function () {
	return { id: this.toString() };
};

/* istanbul ignore next */
mongoose.connection.on('error', (err) => {
	console.log('MongoDB connection error: ' + err);
	process.exit(-1);
});

module.exports = mongoose;