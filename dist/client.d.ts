import { Request } from './types';
import { BlockchainApi } from './modules/blockchain';
import { ContractsApi } from './modules/contracts';
import { TokensContractsApi } from './modules/submodules/tokens';
export declare class Client {
    readonly blockchain: BlockchainApi;
    readonly contracts: ContractsApi;
    readonly tokens: TokensContractsApi;
    private readonly axios;
    private id;
    /**
     * send a JSON RPC request
     * @param rpcNodeUrl the url of the JSON RPC node
     * @param timeout timeout after which the request is aborted, default 15 secs
     */
    constructor(rpcNodeUrl: string, timeout?: number);
    /**
     * send a JSON RPC request
     * @param endpoint endpoint
     * @param request request
     * @param callback callback called after the request is sent if passed (a promise is returned otherwise)
     */
    send<T>(endpoint: string, request: Request, callback: any): Promise<T>;
    /**
     * send a JSON RPC request, return a promise
     * @param endpoint endpoint
     * @param request request
     */
    private sendWithPromise;
    /**
     * send a JSON RPC request with callback
     * @param endpoint endpoint
     * @param request request
     * @param callback callback called after the request is sent
     */
    private sendWithCallback;
}
