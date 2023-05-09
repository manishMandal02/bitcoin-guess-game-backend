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
    const { data } = await axios(`https://www.livecoinwatch.com`);
    const $ = cheerio.load(data, null, false);
    const selector = `#__next > div > div.content-hack > main > div.d-flex.justify-content-center > div > div.d-flex.flex-row.col-12.px-0.bordered-mob-table > div.lcw-table-container.main-table > table > tbody > tr:nth-child(1) > td.filter-item.table-item.main-price`;
    price = $(selector).text();
    price = Number(price.slice(1));
    res.json({ price: price });
  } catch (err) {
    console.log(err);
    res.status(500);
    res.json({ error: err.message });
  }
});

module.exports = router;
