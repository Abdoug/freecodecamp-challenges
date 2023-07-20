'use strict';
const StockModel = require("../models/stock").Stock
const fetch = require("node-fetch");

async function createStock(stock, like, ip) {
    const newStock = new StockModel({
        symbol: stock,
        likes: like ? [ip] : []
    })
    const savedStock = await newStock.save()

    return savedStock
}

async function findStock(stock) {
    return await StockModel.findOne({
        symbol: stock
    }).exec()
}
  
async function saveStock(stock, like, ip) {
    let stockToBeSaved = {}
    const foundStock = await findStock(stock)

    if (!foundStock) {
        const createdStock = await createStock(stock, like, ip)

        stockToBeSaved = createdStock
    } else {
        if (like && foundStock.likes.indexOf(ip) === -1) {
            foundStock.likes.push(ip)
        }

        stockToBeSaved = await foundStock
        await stockToBeSaved.save()
    }

    return stockToBeSaved
}
  
async function getStock(stock) {
    const URL = `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${stock}/quote`
    const response = await fetch(URL)
    const {
        symbol,
        latestPrice
    } = await response.json()

    return {
        symbol,
        latestPrice
    }
}

exports.saveStock = saveStock
exports.getStock = getStock