'use strict';

const getStock = require("../services/stock").getStock
const saveStock = require("../services/stock").saveStock

const compareStockes = async (stocksArray, like, ip) => {
  const {
    symbol,
    latestPrice
  } = await getStock(stocksArray[0])
  const {
    symbol: symbol2,
    latestPrice: latestPrice2
  } = await getStock(stocksArray[1])

  const savedStock = await saveStock(stocksArray[0], like, ip)
  const savedStock2 = await saveStock(stocksArray[1], like, ip)
  let stockData = []

  if (!symbol) {
    stockData.push({
      rel_likes: savedStock.likes.length - savedStock2.likes.length
    })
  } else {
    stockData.push({
      stock: symbol,
      price: latestPrice,
      rel_likes: savedStock.likes.length - savedStock2.likes.length
    })
  }

  if (!symbol2) {
    stockData.push({
      rel_likes: savedStock2.likes.length - savedStock.likes.length
    })
  } else {
    stockData.push({
      stock: symbol2,
      price: latestPrice2,
      rel_likes: savedStock2.likes.length - savedStock.likes.length
    })
  }

  return stockData
}

const processOneStock = async (stock, like, ip) => {
  const {
    symbol,
    latestPrice
  } = await getStock(stock)

  if (!symbol) {
      return {
        likes: like ? 1 : 0
      }
  }

  const savedStock = await saveStock(symbol, like, ip)

  return {
    stock: symbol,
    price: latestPrice,
    likes: savedStock.likes.length
  }
}

module.exports = function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const {
        stock,
        like
      } = req.query
      let stockData;

      if (Array.isArray(stock)) {
        stockData = await compareStockes(stock, like, req.ip)
      } else {
        stockData = await processOneStock(stock, like, req.ip)
      }
      
      return res.json({
        stockData
      })
    });
    
};
