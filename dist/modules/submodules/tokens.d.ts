import { AssetSymbol } from '../../types';
import { ContractsApi, ContractsOptions } from '../contracts';
export interface TokenBalance {
    _id: number;
    account: string;
    symbol: string;
    balance: string;
    stake: string;
    pendingUnstake: string;
    delegationsIn: string;
    delegationsOut: string;
    pendingUndelegations: string;
}
export interface TokenDelegation {
    _id: number;
    from: string;
    to: string;
    symbol: string;
    quantity: string;
}
export interface PendingUnstakes {
    _id: number;
    account: string;
    symbol: string;
    quantity: string;
    quantityLeft: string;
    nextTransactionTimestamp: string;
    numberTransactionsLeft: string;
    txID: string;
}
export interface PendingUndelegations {
    account: string;
    symbol: string;
    quantity: string;
    completeTimestamp: string;
    txID: string;
}
export declare class TokensContractsApi {
    private readonly contracts;
    private key;
    constructor(contracts: ContractsApi);
    getContract(): Promise<import("../contracts").Contract>;
    getBalanceByAccount(account: string, symbol: AssetSymbol): Promise<TokenBalance>;
    getBalancesByAccount(account: string, symbols: AssetSymbol[], options?: ContractsOptions): Promise<TokenBalance[]>;
    getBalances(query?: any, options?: ContractsOptions): Promise<TokenBalance[]>;
    getTokens(options?: ContractsOptions): Promise<any>;
}
