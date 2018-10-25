//const d3 = require('d3-fetch');
// if (typeof fetch !== "function") {
//   global.fetch = require("node-fetch-polyfill");
// }

// async function getRawData() {
//     const tickers = await d3
//       .json("https://api.hitbtc.com/api/2/public/ticker");
//       return await tickers;
// }

// async function aa() {
//     const arr = await getRawData();
//     console.log(arr.map(item => {return {"symbol":item.symbol,"ask":item.ask,"bid":item.bid}}));
// }

//aa();

//const express = require('express');

const express = require('./services/express');
const api = require('./api');
const ctrl = require('./api/controller');
const mongoose = require('./services/mongoose');
const mongoConfig = require('./config').mongo;
const expressPort = require('./config').port;

const app = express(api,__dirname);
console.log(mongoConfig.uri);
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
console.log('Listening on port ',expressPort);

setInterval(() => ctrl.utils.refreshTickers(),10*60*1000);

