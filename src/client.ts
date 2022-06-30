import axios, { Axios } from 'axios';
import { Request } from './types';
import { BlockchainApi } from './modules/blockchain';
import { ContractsApi } from './modules/contracts';
import { TokensContractsApi } from './modules/submodules/tokens';

export class Client {
    // Modules
    public readonly blockchain: BlockchainApi;
    public readonly contracts: ContractsApi;

    // Submodules
    public readonly tokens: TokensContractsApi;

    private readonly axios: Axios;
    private id: number;

    /**
     * send a JSON RPC request
     * @param rpcNodeUrl the url of the JSON RPC node
     * @param timeout timeout after which the request is aborted, default 15 secs
     */
    constructor(rpcNodeUrl: string, timeout = 15000) {
        this.axios = axios.create({
            baseURL: rpcNodeUrl,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        this.id = 1;

        // Modules
        this.blockchain = new BlockchainApi(this);
        this.contracts = new ContractsApi(this);

        // Submodules
        this.tokens = new TokensContractsApi(this.contracts);
    }

    /**
     * send a JSON RPC request
     * @param endpoint endpoint
     * @param request request
     * @param callback callback called after the request is sent if passed (a promise is returned otherwise)
     */
    public send<T>(endpoint: string, request: Request, callback: any) {
        if (callback) {
            this.sendWithCallback(endpoint, request, callback);
        }

        return this.sendWithPromise<T>(endpoint, request);
    }

    /**
     * send a JSON RPC request, return a promise
     * @param endpoint endpoint
     * @param request request
     */
    private sendWithPromise<T>(endpoint: string, request: Request): Promise<T> {
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
    private sendWithCallback(endpoint: string, request: Request, callback: any) {
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
