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
    indexes?: { index: string; descending: boolean }[];
}

export class ContractsApi {
    constructor(private readonly client: Client) {}

    public call<T = any>(request: Request, callback: any = null) {
        return this.client.send<T>('contracts', request, callback);
    }

    /**
     * Get the information of a contract (owner, source code, etc...)
     * @param name contract name
     * @param callback callback called if passed
     */
    public getContract(name: string, callback: any = null) {
        const request: Request = {
            method: 'getContract',
            params: {
                name,
            },
        };

        return this.call<Contract>(request, callback);
    }

    /**
     * retrieve a record from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param callback callback called if passed
     */
    public findOne<T = any>(contract: string, table: string, query: any, callback: any = null) {
        const request: Request = {
            method: 'findOne',
            params: {
                contract,
                table,
                query,
            },
        };

        return this.call<T>(request, callback);
    }

    /**
     * retrieve records from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param opations options
     */
    public find<T = any>(contract: string, table: string, query: any, options: ContractsOptions = { limit: 1000, offset: 0, indexes: [] }, callback = null) {
        const request: Request = {
            method: 'find',
            params: {
                contract,
                table,
                query,
                ...options,
            },
        };

        return this.call<T>(request, callback);
    }
}
