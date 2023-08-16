const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('5 functional GET requests', function() {
        test('Viewing one stock: GET request to /api/stock-prices', function (done) {
            chai
                .request(server)
                .get('/api/stock-prices')
                .set('content-type', 'application/json')
                .query({ stock: 'TSLA' })
                .end(function (err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, 'TSLA')
                    assert.exists(res.body.stockData.price, 'TSLA has a price')
                    done()
                })
        })

        test('Viewing one stock and liking it: GET request to /api/stock-prices', function (done) {
            chai
                .request(server)
                .get('/api/stock-prices')
                .set('content-type', 'application/json')
                .query({ stock: 'MSFT', like: true })
                .end(function (err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, 'MSFT')
                    // Check with 2, because my IP address got canged as using VPN
                    assert.equal(res.body.stockData.likes, 2)
                    assert.exists(res.body.stockData.price, 'MSFT has a price')
                    done()
                })
        })

        test('Viewing one stock and liking it again: GET request to /api/stock-prices', function (done) {
            chai
                .request(server)
                .get('/api/stock-prices')
                .set('content-type', 'application/json')
                .query({ stock: 'MSFT', like: true })
                .end(function (err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData.stock, 'MSFT')
                    // Check with 2, because my IP address got changed as using VPN
                    assert.equal(res.body.stockData.likes, 2)
                    assert.exists(res.body.stockData.price, 'MSFT has a price')
                    done()
                })
        })

        test('Viewing two stock: GET request to /api/stock-prices', function (done) {
            chai
                .request(server)
                .get('/api/stock-prices')
                .set('content-type', 'application/json')
                .query({ stock: ['GOOG', 'GOLD']})
                .end(function (err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData[0].stock, 'GOOG')
                    assert.equal(res.body.stockData[1].stock, 'GOLD')
                    assert.exists(res.body.stockData[0].price, 'GOOG has a price')
                    assert.exists(res.body.stockData[1].price, 'GOLD has a price')
                    done()
                })
        })

        test('Viewing two stock and liking them: GET request to /api/stock-prices', function (done) {
            chai
                .request(server)
                .get('/api/stock-prices')
                .set('content-type', 'application/json')
                .query({ stock: ['GOOG', 'GOLD'], like: true})
                .end(function (err, res) {
                    assert.equal(res.status, 200)
                    assert.equal(res.body.stockData[0].stock, 'GOOG')
                    assert.equal(res.body.stockData[1].stock, 'GOLD')
                    assert.exists(res.body.stockData[0].price, 'GOOG has a price')
                    assert.exists(res.body.stockData[1].price, 'GOLD has a price')
                    assert.exists(res.body.stockData[0].rel_likes, 'GOOG has relative likes')
                    assert.exists(res.body.stockData[1].rel_likes, 'GOLD has relative likes')
                    done()
                })
        })
    })
});
