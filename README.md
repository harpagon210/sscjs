

  
# [sscjs](https://github.com/harpagon210/sscjs) [![Build Status](https://travis-ci.org/harpagon210/sscjs.svg?branch=master)](https://travis-ci.org/harpagon210/sscjs)

Light javascript library to interact with the JSON RPC server of [a Steem Smart Contracts node](https://github.com/harpagon210/steemsmartcontracts)

Installation
------------

### Via npm

For node.js or the browser with [browserify](https://github.com/substack/node-browserify) or [webpack](https://github.com/webpack/webpack).

```
npm install sscjs
```

### From a cdn or self-hosted script

Grab `dist/ssc.min.js` from a [release](https://github.com/harpagon210/sscjs/releases) and include in your html:

```html
<script src="ssc.min.js"></script>
```

or from the [jsdelivr](https://cdn.jsdelivr.net) cdn:

```html
<script src="https://cdn.jsdelivr.net/npm/sscjs@latest/dist/ssc.min.js"></script>
```


Usage
-----

### In the browser
This library requires the [axios library](https://github.com/axios/axios)

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sscjs@latest/dist/ssc.min.js"></script>
<script>
    const ssc = new SSC('https://testapi.steem-engine.com');
    ssc.getLatestBlockInfo((err, result) => {
		console.log(err, result);
	});
</script>
```

### In node.js

```javascript
const SSC = require('sscjs');

const ssc = new SSC('https://testapi.steem-engine.com');
ssc.stream((err, res) => {
	console.log(err, res);
});
```

Available methods
-----

```javascript
/**

* Get the information of a contract (owner, source code, etc...)

* @param  {String}  name contract name

* @param  {Function}  callback callback called if passed

* @returns  {Promise<JSON>} returns a promise if no callback passed

*/

getContractInfo(contract, callback  =  null)

// example
ssc.getContractInfo('tokens', (err, result) => {
	console.log(err, result);
	/*
	{
	    "name": "tokens",
	    "owner": "steemsc",
	    "code": "...source code of the contract...",
	    "tables": [
	        "tokens_tokens",
		...
	    ],
	    "$loki": 1
	}
	*/
})
```

```javascript
/**

* retrieve a record from the table of a contract

* @param  {String}  contract contract name

* @param  {String}  table table name

* @param  {JSON}  query query to perform on the table

* @param  {Function}  callback callback called if passed

* @returns  {Promise<JSON>} returns a promise if no callback passed

*/

findOne(contract, table, query, callback  =  null)

// example
// See https://github.com/techfort/LokiJS/wiki/Query-Examples for the available params
ssc.findOne(
	'tokens', 
	'balances', 
	{ 
		account:  'harpagon' 
	}, (err, result) => {

	console.log(err, result);
	/*
	{
            "account": "harpagon",
            "symbol": "SSC",
            "balance": 3.0005,
            "$loki": 6
        }
	*/
})
```

```javascript
/**
   * retrieve records from the table of a contract
   * @param {String} contract contract name
   * @param {String} table table name
   * @param {JSON} query query to perform on the table
   * @param {Integer} limit limit the number of records to retrieve
   * @param {Integer} offset offset applied to the records set
   * @param {Array<Object>} indexes array of index definitions { index: string, descending: boolean }
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
*/

find(contract, table, query, limit = 1000, offset = 0, indexes = [], callback = null) 

// example
// See https://github.com/techfort/LokiJS/wiki/Query-Examples for the available params

ssc.find('tokens', 'tokens', { }, 1000, 0, [], (err, result) => {
	console.log(err, result);
	/*
	[
	    	{
		    "issuer": "steemsc",
		    "symbol": "STEEMP",
		    "name": "STEEM Pegged",
		    "precision": 3,
		    "maxSupply": 1000000000000,
		    "supply": 1000000000000,
		    "$loki": 1
		},
		{
		    "issuer": "null",
		    "symbol": "SSC",
		    "name": "Steem Smart Contracts Token",
		    "url": "https://steemsmartcontracts.com",
		    "precision": 8,
		    "maxSupply": 1000000000000,
		    "supply": 250000000,
		    "$loki": 2
		},
	]
	*/
})
```

```javascript
/**

* retrieve the latest block info of the sidechain

* @param  {Function}  callback callback called if passed

* @returns  {Promise<JSON>} returns a promise if no callback passed

*/

getLatestBlockInfo(callback  =  null)

// example
ssc.getLatestBlockInfo((err, result) => {
	console.log(err, result);
	/*
	{
	    "blockNumber": 12,
	    "refSteemBlockNumber": 25797141,
	    "previousHash": "9389c132270c7335b806a43bd063110fe3868015f96db80470bef2f48f1c2fcb",
	    "timestamp": "2018-09-09T02: 48: 48",
	    "transactions": [
	        {
	            "refSteemBlockNumber": 25797141,
	            "transactionId": "b299d24be543cd50369dbc83cf6ce10e2e8abc9b",
	            "sender": "smmarkettoken",
	            "contract": "smmkt",
	            "action": "updateBeneficiaries",
	            "payload": {
	                "beneficiaries": [
	                    "harpagon"
	                ],
	                "isSignedWithActiveKey": true
	            },
	            "hash": "ac33d2fcaf2d72477483ab1f2ed4bf3bb077cdb55d5371aa896e8f3fd034e6fd",
	            "logs": "{}"
	        }
	    ],
	    "hash": "e97e4b9a88b4ac5b8ed5f7806738052d565662eec962a0c0bbd171672a4a54d4",
	    "merkleRoot": "2f1221ae1938bc24f3ed593e8c57ea41882fedc5d31de21da9c9bd613360f3a6"
	}
	*/
})
```


```javascript
/**

* retrieve the specified block info of the sidechain

* @param  {Number}  blockNumber block number

* @param  {Function}  callback callback called if passed

* @returns  {Promise<JSON>} returns a promise if no callback passed

*/

getBlockInfo(blockNumber, callback  =  null)

// example
ssc.getBlockInfo(12, (err, result) => {
	console.log(err, result);
	/*
	{
	    "blockNumber": 12,
	    "refSteemBlockNumber": 25797141,
	    "previousHash": "9389c132270c7335b806a43bd063110fe3868015f96db80470bef2f48f1c2fcb",
	    "timestamp": "2018-09-09T02: 48: 48",
	    "transactions": [
	        {
	            "refSteemBlockNumber": 25797141,
	            "transactionId": "b299d24be543cd50369dbc83cf6ce10e2e8abc9b",
	            "sender": "smmarkettoken",
	            "contract": "smmkt",
	            "action": "updateBeneficiaries",
	            "payload": {
	                "beneficiaries": [
	                    "harpagon"
	                ],
	                "isSignedWithActiveKey": true
	            },
	            "hash": "ac33d2fcaf2d72477483ab1f2ed4bf3bb077cdb55d5371aa896e8f3fd034e6fd",
	            "logs": "{}"
	        }
	    ],
	    "hash": "e97e4b9a88b4ac5b8ed5f7806738052d565662eec962a0c0bbd171672a4a54d4",
	    "merkleRoot": "2f1221ae1938bc24f3ed593e8c57ea41882fedc5d31de21da9c9bd613360f3a6"
	}
	*/
})
```

```javascript
/**

* retrieve the specified transaction info of the sidechain

* @param  {String}  txid transaction id

* @param  {Function}  callback callback called if passed

* @returns  {Promise<JSON>} returns a promise if no callback passed

*/

getTransactionInfo(txid, callback  =  null)

// example
ssc.getTransactionInfo('b299d24be543cd50369dbc83cf6ce10e2e8abc9b', (err, result) => {
	console.log(err, result);
	/*
	{
	    "blockNumber": 12,
	    "refSteemBlockNumber": 25797141,
	    "transactionId": "b299d24be543cd50369dbc83cf6ce10e2e8abc9b",
	    "sender": "smmarkettoken",
	    "contract": "smmkt",
	    "action": "updateBeneficiaries",
	    "payload": {
		"beneficiaries": [
		    "harpagon"
		],
		"isSignedWithActiveKey": true
	    },
	    "hash": "ac33d2fcaf2d72477483ab1f2ed4bf3bb077cdb55d5371aa896e8f3fd034e6fd",
	    "logs": "{}"
	}
	*/
})
```

```javascript
/**

* stream part of the sidechain

* @param  {Number}  startBlock the first block to retrieve

* @param  {Number}  endBlock if passed the stream will stop after the block is retrieved

* @param  {Function}  callback callback called everytime a block is retrieved

* @param  {Number}  pollingTime polling time, default 1 sec

*/

streamFromTo(startBlock, endBlock  =  null, callback, pollingTime  =  1000)

// example
ssc.streamFromTo(0, 12, (err, result) => {
	console.log(err, result);
	/*
	{
	    "blockNumber": 12,
	    "refSteemBlockNumber": 25797141,
	    "previousHash": "9389c132270c7335b806a43bd063110fe3868015f96db80470bef2f48f1c2fcb",
	    "timestamp": "2018-09-09T02: 48: 48",
	    "transactions": [
	        {
	            "refSteemBlockNumber": 25797141,
	            "transactionId": "b299d24be543cd50369dbc83cf6ce10e2e8abc9b",
	            "sender": "smmarkettoken",
	            "contract": "smmkt",
	            "action": "updateBeneficiaries",
	            "payload": {
	                "beneficiaries": [
	                    "harpagon"
	                ],
	                "isSignedWithActiveKey": true
	            },
	            "hash": "ac33d2fcaf2d72477483ab1f2ed4bf3bb077cdb55d5371aa896e8f3fd034e6fd",
	            "logs": "{}"
	        }
	    ],
	    "hash": "e97e4b9a88b4ac5b8ed5f7806738052d565662eec962a0c0bbd171672a4a54d4",
	    "merkleRoot": "2f1221ae1938bc24f3ed593e8c57ea41882fedc5d31de21da9c9bd613360f3a6"
	}
	*/
})
```

```javascript
/**

* stream the sidechain (starting from the latest block produced)

* @param  {Function}  callback callback called everytime a block is retrieved

* @param  {Number}  pollingTime polling time, default 1 sec

*/

stream(callback, pollingTime  =  1000)

// example
ssc.stream((err, result) => {
	console.log(err, result);
	/*
	{
	    "blockNumber": 12,
	    "refSteemBlockNumber": 25797141,
	    "previousHash": "9389c132270c7335b806a43bd063110fe3868015f96db80470bef2f48f1c2fcb",
	    "timestamp": "2018-09-09T02: 48: 48",
	    "transactions": [
	        {
	            "refSteemBlockNumber": 25797141,
	            "transactionId": "b299d24be543cd50369dbc83cf6ce10e2e8abc9b",
	            "sender": "smmarkettoken",
	            "contract": "smmkt",
	            "action": "updateBeneficiaries",
	            "payload": {
	                "beneficiaries": [
	                    "harpagon"
	                ],
	                "isSignedWithActiveKey": true
	            },
	            "hash": "ac33d2fcaf2d72477483ab1f2ed4bf3bb077cdb55d5371aa896e8f3fd034e6fd",
	            "logs": "{}"
	        }
	    ],
	    "hash": "e97e4b9a88b4ac5b8ed5f7806738052d565662eec962a0c0bbd171672a4a54d4",
	    "merkleRoot": "2f1221ae1938bc24f3ed593e8c57ea41882fedc5d31de21da9c9bd613360f3a6"
	}
	*/
})
```
