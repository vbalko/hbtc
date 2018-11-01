const mongoose = require('mongoose');
const logger = require('../winston');

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
	logger.console.error('MongoDB connection error: ' + err);
	process.exit(-1);
});

module.exports = mongoose;