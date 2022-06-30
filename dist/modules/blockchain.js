"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainApi = void 0;
class BlockchainApi {
    client;
    constructor(client) {
        this.client = client;
    }
    call(request, callback = null) {
        return this.client.send('blockchain', request, callback);
    }
    /**
     * retrieve the specified transaction info of the sidechain
     * @param txid transaction id
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getStatus() {
        const request = {
            method: 'getStatus',
        };
        return this.call(request);
    }
    /**
     * retrieve the specified block info of the sidechain
     * @param blockNumber block number
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getBlock(blockNumber) {
        const request = {
            method: 'getBlockInfo',
            params: {
                blockNumber,
            },
        };
        return this.call(request);
    }
    /**
     * retrieve the latest block info of the sidechain
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getLatestBlock() {
        const request = {
            method: 'getLatestBlockInfo',
        };
        return this.call(request);
    }
    /**
     * retrieve the specified transaction info of the sidechain
     * @param txid transaction id
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getTransaction(txid) {
        const request = {
            method: 'getTransactionInfo',
            params: {
                txid,
            },
        };
        return this.call(request);
    }
    /**
     * stream part of the sidechain
     * @param startBlock the first block to retrieve
     * @param endBlock if passed the stream will stop after the block is retrieved
     * @param callback callback called everytime a block is retrieved
     * @param pollingTime polling time, default 1 sec
     */
    async streamFromTo(startBlock, callback, endBlock = -1, pollingTime = 1000) {
        try {
            const res = await this.getBlock(startBlock);
            let nextBlock = startBlock;
            if (res !== null) {
                callback(null, res);
                nextBlock += 1;
            }
            if (endBlock === -1 || (endBlock && nextBlock <= endBlock)) {
                setTimeout(() => {
                    this.streamFromTo(nextBlock, endBlock, callback, pollingTime);
                }, pollingTime);
            }
        }
        catch (err) {
            callback(err, null);
            setTimeout(() => {
                this.streamFromTo(startBlock, endBlock, callback, pollingTime);
            }, pollingTime);
        }
    }
    /**
     * stream the sidechain (starting from the latest block produced)
     * @param callback callback called everytime a block is retrieved
     * @param pollingTime polling time, default 1 sec
     */
    async stream(callback, pollingTime = 1000) {
        const { blockNumber } = await this.getLatestBlock();
        this.streamFromTo(blockNumber, null, callback, pollingTime);
    }
}
exports.BlockchainApi = BlockchainApi;
//# sourceMappingURL=blockchain.js.map