const express = require('express');
const d3 = require("d3-fetch");

const router = new express.Router();

if (typeof fetch !== "function") {
  global.fetch = require("node-fetch-polyfill");
}

//ROOT
router.get("/api",async (req,res) => res.json(
// async function getRawData() {
     //await d3.json("https://api.hitbtc.com/api/2/public/ticker")//;
    //    return await tickers;
// }
     await getData()
));

async function getData() {
    const tickers = await d3.json("https://api.hitbtc.com/api/2/public/ticker");
    const aSymbols = await tickers.map((item) => item.symbol);
    return await aSymbols;
}

var handleRoot = (req,res) => {
// async function getRawData() {
//     const tickers = await d3
//       .json("https://api.hitbtc.com/api/2/public/ticker");
//       return await tickers;
// }
    return res.json({"root":"test"});
};

module.exports = router;