const express = require('express');
const axios = require('axios');
const router = express.Router();
const cheerio = require('cheerio');

router.get('/', async (req, res) => {
  let price = 0;
  try {
    // const { data } = await axios(`https://coinmarketcap.com/currencies/bitcoin/`);
    // const $ = cheerio.load(data, null, false);
    // const price = $('div .priceValue > span').text();
    const { data } = await axios(`https://www.livecoinwatch.com/price/Bitcoin-BTC`);
    const $ = cheerio.load(data, null, false);
    price = $('.price').text().split('$')[1];

    console.log('🚀 ~ file: bitcoinPrice.js:16 ~ router.get ~ price:', price);

    price = Number(price);
    res.json({ price: price });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: err.message });
  }
});

module.exports = router;
