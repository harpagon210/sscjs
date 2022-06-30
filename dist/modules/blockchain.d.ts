import { Client } from '../client';
export interface Block {
    _id: number;
    blockNumber: number;
    refHiveBlockNumber: number;
    refHiveBlockId: string;
    prevRefHiveBlockId: string;
    previousHash: string;
    previousDatabaseHash: string;
    timestamp: string;
    transactions: Transaction[];
    virtualTransactions: any[];
    hash: string;
    databaseHash: string;
    merkleRoot: string;
    round: number | null;
    roundHash: string;
    witness: string;
    signingKey: string;
    roundSignature: string;
}
export interface Transaction {
    blockNumber: number;
    refHiveBlockNumber: number;
    transactionId: string;
    sender: string;
    contract: string;
    action: string;
    payload: string;
    executedCodeHash: string;
    hash: string;
    databaseHash: string;
    logs: string;
}
export interface BlockchainStatus {
    lastBlockNumber: number;
    lastBlockRefHiveBlockNumber: number;
    lastHash: string;
    lastParsedHiveBlockNumber: number;
    SSCnodeVersion: string;
    domain: string;
    chainId: string;
    lightNode: boolean;
}
export declare class BlockchainApi {
    private readonly client;
    constructor(client: Client);
    private call;
    /**
     * retrieve the specified transaction info of the sidechain
     * @param txid transaction id
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getStatus(): Promise<BlockchainStatus>;
    /**
     * retrieve the specified block info of the sidechain
     * @param blockNumber block number
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getBlock(blockNumber: number): Promise<Block>;
    /**
     * retrieve the latest block info of the sidechain
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getLatestBlock(): Promise<Block>;
    /**
     * retrieve the specified transaction info of the sidechain
     * @param txid transaction id
     * @param callback callback called if passed
     * @returns returns a promise if no callback passed
     */
    getTransaction(txid: string): Promise<Transaction>;
    /**
     * stream part of the sidechain
     * @param startBlock the first block to retrieve
     * @param endBlock if passed the stream will stop after the block is retrieved
     * @param callback callback called everytime a block is retrieved
     * @param pollingTime polling time, default 1 sec
     */
    streamFromTo(startBlock: number, callback: any, endBlock?: number, pollingTime?: number): Promise<void>;
    /**
     * stream the sidechain (starting from the latest block produced)
     * @param callback callback called everytime a block is retrieved
     * @param pollingTime polling time, default 1 sec
     */
    stream(callback: any, pollingTime?: number): Promise<void>;
}
