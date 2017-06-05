var unirest = require('unirest'),
    crypto  = require('crypto'),
    qs      = require('querystring');

var BASE_URL		= 'https://www.mercadobitcoin.net',
    API_PATH	       	= '/api/v1/',
    TAPI_PATH	       	= '/tapi/v3/',
    ENDPOINT_API       	= BASE_URL + API_PATH,
    ENDPOINT_TRADE_API 	= BASE_URL + TAPI_PATH;


var MercadoBitcoin = function () {
  this.currency = 'BTC';
}

MercadoBitcoin.prototype = {

  get: function (method, currency, res) {
    if (currency) {this.currency = currency;} 
    var isLitecoin = currency === 'LTC';

    unirest.get(ENDPOINT_API + method + (isLitecoin ? '_litecoin' : ''))
    .headers('Accept', 'application/json')
    .end(function (response) {
      res(JSON.parse(response.raw_body));
    });
  }
}


var MercadoBitcoinTrade = function (config) {
    this.key = config.key;
    this.secret = config.secret;
//    this.pin = config.pin;
}

MercadoBitcoinTrade.prototype = {

  execute: function (method, parameters, res) {

    var now = Math.round(new Date().getTime() / 1000);
    var params = new Object;
    if (parameters) { params = parameters;}
    params.tapi_method =  method;
    params.tapi_nonce = now;
    var url_params = qs.stringify(params);
    console.log(url_params);

    var signature = crypto.createHmac('sha512', this.secret)
                          .update(TAPI_PATH + '?' + url_params)
                          .digest('hex');
    unirest.post(ENDPOINT_TRADE_API)
      .headers({'TAPI-ID': this.key})
      .headers({'TAPI-MAC': signature})
      .send(url_params)
      .end(function (response) {
	res(JSON.parse(response.raw_body));
      });
  }
}

module.exports = {
  MercadoBitcoin: MercadoBitcoin,
  MercadoBitcoinTrade: MercadoBitcoinTrade
}
