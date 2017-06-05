[![Stories in Ready](https://badge.waffle.io/marcbarbosa/mercadobitcoin.png?label=ready&title=Ready)](https://waffle.io/marcbarbosa/mercadobitcoin)
#Mercado Bitcoin API client
[Mercado Bitcoin](https://www.mercadobitcoin.com.br) is a cryptocurrency exchange in Brazil. This module has been forked from marcbasbosa's module and modified to work with v3 of the Trade API.

## Install

```shell
npm install mercadobitcoin-v3
```

## Usage

There are 2 API endpoints. One for general info (public) and a trade API (require credentials)

### API - [documentation](https://www.mercadobitcoin.com.br/api/)

```javascript
var MercadoBitcoin = require('mercadobitcoin-v3').MercadoBitcoin;

// The options for currency are: 'BTC' or 'LTC'
var mb = new MercadoBitcoin();

// Call ticker method to get last price of LTC
mb.get('ticker','LTC',console.log);

// Fetch the order book for BTC transactions (default)
mb.get('orderbook', null, console.log);
```

### TRADE API - [documentation](https://www.mercadobitcoin.com.br/trade-api/)

Get your credentials at Mercado Bitcoin website

You will need the following info: Chave, Código ([here](https://www.mercadobitcoin.com.br/tapi/configuracoes/)). The PIN that was used in the previous versions is not needed anymore.

```javascript
var MercadoBitcoinTrade = require('mercadobitcoin-v3').MercadoBitcoinTrade;

/ Credentials
var config = {  key    : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                secret : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
};

var mbt = new MercadoBitcoinTrade(config);

// This object contains extra parameters that you might use for some methods:
var details = {
//		level: 'INFO' ,
		coin_pair: 'BRLLTC',
//		status_list: '[2,3]',
}

// Here you find some of the common methods that you can use as an example. For the complete list, please refer to the Trade API documentation: 
mbt.execute('get_account_info', null, console.log);
//mbt.execute('list_system_messages', details, console.log);
//mbt.execute('list_orders', details, console.log);
//mbt.execute('list_orderbook', details, console.log);

```

### Donations are welcome!
1HEqNnuxpBwJvtxzfT9758mfMVHzGzfWoK
