const express = require('./services/express');
const logger = require('./services/winston');
const api = require('./api');
const ctrl = require('./api/controller');
const mongoose = require('./services/mongoose');
const mongoConfig = require('./config').mongo;
const expressPort = require('./config').port;
const tradeUtil = require('./api/controller/trade/utils');

const app = express(api,__dirname);
//console.log(mongoConfig.uri);
mongoose.connect(mongoConfig.uri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//app.use(express.static(__dirname));


//app.use(express.logger('dev'));
//app.use(express.bodyParser());


/*
const h = require('./services/exchanges/hitbtc');
const oH = new h();
//oH.get('ticker').then( a => console.log(a));
oH.getTickers().then( a => console.log(a));
*/

app.listen(expressPort);
logger.info('Listening on port ',expressPort);

if (false) {
	ctrl.utils.refreshTickers2();
	setInterval(() => ctrl.utils.refreshTickers2(),1*60*1000);


	//every 30 min pass 1m tickers to 5m average tickers
	//tradeUtil.passTo5min().then(() => logger.info('Finished processing...'));
	setInterval(() => tradeUtil.passTo5min().then(()=>logger.info('Finished processing...')),30*60*1000);
//tradeUtil.pt(0).then(() => console.log('Finished processing...'));
} else {
	//ctrl.utils.test().then(data => console.log(data));
}

