import { Client } from '../client';
import { Request } from '../types';
export interface Contract {
    _id: string;
    owner: string;
    code: string;
    codeHash: string;
    tables: {
        [key: string]: {
            size: number;
            hash: string;
            nbIndexes: number;
        };
    };
    version: number;
}
export interface ContractsOptions {
    limit?: number;
    offset?: number;
    indexes?: {
        index: string;
        descending: boolean;
    }[];
}
export declare class ContractsApi {
    private readonly client;
    constructor(client: Client);
    call<T = any>(request: Request, callback?: any): Promise<T>;
    /**
     * Get the information of a contract (owner, source code, etc...)
     * @param name contract name
     * @param callback callback called if passed
     */
    getContract(name: string, callback?: any): Promise<Contract>;
    /**
     * retrieve a record from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param callback callback called if passed
     */
    findOne<T = any>(contract: string, table: string, query: any, callback?: any): Promise<T>;
    /**
     * retrieve records from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param opations options
     */
    find<T = any>(contract: string, table: string, query: any, options?: ContractsOptions, callback?: null): Promise<T>;
}
