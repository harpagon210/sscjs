import axios from 'axios';

const BLOCKCHAIN_API = 'blockchain';
const CONTRACTAPI = 'contracts';

export default class SSC {
  /**
   * send a JSON RPC request
   * @param {String} rpcNodeUrl the url of the JSON RPC node
   * @param {Number} timeout timeout after which the request is aborted, default 15 secs
   */
  constructor(rpcNodeUrl, timeout = 15000) {
    this.axios = axios.create({
      baseURL: rpcNodeUrl,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

    this.id = 1;
  }

  /**
   * send a JSON RPC request
   * @param {String} endpoint endpoint
   * @param {JSON} request request
   * @param {Function} callback callback called after the request is sent if passed (a promise is returned otherwise)
   */
  send(endpoint, request, callback) {

    if (callback) {
      this.sendWithCallback(endpoint, request, callback);
    }

    return this.sendWithPromise(endpoint, request);
  }

  /**
   * send a JSON RPC request with callback
   * @param {String} endpoint endpoint
   * @param {JSON} request request
   * @param {Function} callback callback called after the request is sent
   */
  sendWithCallback(endpoint, request, callback) {
    const postData = {
      jsonrpc: '2.0',
      id: this.id,
      ...request,
    };

    this.id += 1;

    this.axios.post(endpoint, postData)
      .then((response) => {
        callback(null, response.data.result);
      })
      .catch((error) => {
        callback(error, null);
      });
  }

  /**
   * send a JSON RPC request, return a promise
   * @param {String} endpoint endpoint
   * @param {JSON} request request
   * @returns {Promise<JSON>} returns a promise
   */
  sendWithPromise(endpoint, request) {
    const postData = {
      jsonrpc: '2.0',
      id: this.id,
      ...request,
    };

    this.id += 1;

    return new Promise((resolve, reject) => {
      this.axios.post(endpoint, postData)
        .then((response) => {
          resolve(response.data.result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the information of a contract (owner, source code, etc...)
   * @param {String} contract contract name
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
   */
  getContractInfo(contract, callback = null) {
    const request = {
      'method': 'getContract',
      'params': {
        contract
      },
    };

    return this.send(CONTRACTAPI, request, callback);
  }

  /**
   * retrieve a record from the table of a contract
   * @param {String} contract contract name
   * @param {String} table table name
   * @param {JSON} query query to perform on the table
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
   */
  findOneInTable(contract, table, query, callback = null) {
    const request = {
      'method': 'findOneInTable',
      'params': {
        contract,
        table,
        query,
      },
    };

    return this.send(CONTRACTAPI, request, callback);
  }

  /**
   * retrieve records from the table of a contract
   * @param {String} contract contract name
   * @param {String} table table name
   * @param {JSON} query query to perform on the table
   * @param {Integer} limit limit the number of records to retrieve
   * @param {Integer} offset offset applied to the records set
   * @param {String} index name of the index to use for the query
   * @param {Boolean} descending the records set is sorted ascending if false, descending if true
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
   */
  findInTable(contract, table, query, limit = 1000, offset = 0, index = '', descending = false, callback = null) {
    const request = {
      'method': 'findInTable',
      'params': {
        contract,
        table,
        query,
        limit,
        offset,
        index,
        descending,
      },
    };

    return this.send(CONTRACTAPI, request, callback);
  }

  /**
   * retrieve the latest block info of the sidechain
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
   */
  getLatestBlockInfo(callback = null) {
    const request = {
      'method': 'getLatestBlockInfo',
    };

    return this.send(BLOCKCHAIN_API, request, callback);
  }

  /**
   * retrieve the specified block info of the sidechain
   * @param {Number} blockNumber contract name
   * @param {Function} callback callback called if passed
   * @returns {Promise<JSON>} returns a promise if no callback passed
   */
  getBlockInfo(blockNumber, callback = null) {
    const request = {
      'method': 'getBlockInfo',
      "params": {
        blockNumber
      }
    };

    return this.send(BLOCKCHAIN_API, request, callback);
  }

  /**
   * stream part of the sidechain
   * @param {Number} startBlock the first block to retrieve
   * @param {Number} endBlock if passed the stream will stop after the block is retrieved
   * @param {Function} callback callback called everytime a block is retrieved
   * @param {Number} pollingTime polling time, default 1 sec
   */
  async streamFromTo(startBlock, endBlock = null, callback, pollingTime = 1000) {
    try {
      const res = await this.getBlockInfo(startBlock);
      let nextBlock = startBlock;
      if (res !== null) {
        callback(null, res);
        nextBlock += 1;
      }
      
      if (endBlock === null || (endBlock && nextBlock <= endBlock)) {
        setTimeout(() => {
          this.streamFromTo(nextBlock, endBlock, callback, pollingTime);
        }, pollingTime)
      }
    } catch (err) {
      callback(err, null);
      setTimeout(() => {
        this.streamFromTo(startBlock, endBlock, callback, pollingTime);
      }, pollingTime)
    }
  }

  /**
   * stream the sidechain (starting from the latest block produced)
   * @param {Function} callback callback called everytime a block is retrieved
   * @param {Number} pollingTime polling time, default 1 sec
   */
  async stream(callback, pollingTime = 1000) {
    const { blockNumber } = await this.getLatestBlockInfo();
    
    this.streamFromTo(blockNumber, null, callback, pollingTime);
  }
};
