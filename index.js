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
const mongoose = require('./services/mongoose');
const mongoConfig = require('./config').mongo;

const app = express(api,__dirname);
console.log(mongoConfig.uri);
mongoose.connect(mongoConfig.uri, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

//app.use(express.static(__dirname));


//app.use(express.logger('dev'));
//app.use(express.bodyParser());


app.listen(4000);
console.log('Listening on port 4000');


