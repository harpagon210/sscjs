"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const axios_1 = __importDefault(require("axios"));
const blockchain_1 = require("./modules/blockchain");
const contracts_1 = require("./modules/contracts");
const tokens_1 = require("./modules/submodules/tokens");
class Client {
    // Modules
    blockchain;
    contracts;
    // Submodules
    tokens;
    axios;
    id;
    /**
     * send a JSON RPC request
     * @param rpcNodeUrl the url of the JSON RPC node
     * @param timeout timeout after which the request is aborted, default 15 secs
     */
    constructor(rpcNodeUrl, timeout = 15000) {
        this.axios = axios_1.default.create({
            baseURL: rpcNodeUrl,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        this.id = 1;
        // Modules
        this.blockchain = new blockchain_1.BlockchainApi(this);
        this.contracts = new contracts_1.ContractsApi(this);
        // Submodules
        this.tokens = new tokens_1.TokensContractsApi(this.contracts);
    }
    /**
     * send a JSON RPC request
     * @param endpoint endpoint
     * @param request request
     * @param callback callback called after the request is sent if passed (a promise is returned otherwise)
     */
    send(endpoint, request, callback) {
        if (callback) {
            this.sendWithCallback(endpoint, request, callback);
        }
        return this.sendWithPromise(endpoint, request);
    }
    /**
     * send a JSON RPC request, return a promise
     * @param endpoint endpoint
     * @param request request
     */
    sendWithPromise(endpoint, request) {
        const postData = {
            jsonrpc: '2.0',
            id: this.id,
            ...request,
        };
        this.id += 1;
        return new Promise((resolve, reject) => {
            this.axios
                .post(endpoint, postData)
                .then((response) => {
                resolve(response.data.result);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    /**
     * send a JSON RPC request with callback
     * @param endpoint endpoint
     * @param request request
     * @param callback callback called after the request is sent
     */
    sendWithCallback(endpoint, request, callback) {
        const postData = {
            jsonrpc: '2.0',
            id: this.id,
            ...request,
        };
        this.id += 1;
        this.axios
            .post(endpoint, postData)
            .then((response) => {
            callback(null, response.data.result);
        })
            .catch((error) => {
            callback(error, null);
        });
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map