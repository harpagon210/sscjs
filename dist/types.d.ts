export declare type MethodName = 'getLatestBlockInfo' | 'getContract' | 'findOne' | 'find' | 'getLatestBlockInfo' | 'getBlockInfo' | 'getTransactionInfo' | 'getStatus';
export declare type AssetSymbol = 'SWAP.HIVE' | 'BEE' | 'DEC' | 'ALPHA' | 'BETA' | 'UNTAMED' | 'CHAOS' | string;
export interface Request {
    method: MethodName;
    params?: Object;
}
