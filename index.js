const d3 = require('d3-fetch');
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

const express = require('express');

const app = express();

app.use(express.static(__dirname));


  //app.use(express.logger('dev'));
  //app.use(express.bodyParser());


app.listen(4000);
console.log('Listening on port 4000');


