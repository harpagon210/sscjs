"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractsApi = void 0;
class ContractsApi {
    client;
    constructor(client) {
        this.client = client;
    }
    call(request, callback = null) {
        return this.client.send('contracts', request, callback);
    }
    /**
     * Get the information of a contract (owner, source code, etc...)
     * @param name contract name
     * @param callback callback called if passed
     */
    getContract(name, callback = null) {
        const request = {
            method: 'getContract',
            params: {
                name,
            },
        };
        return this.call(request, callback);
    }
    /**
     * retrieve a record from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param callback callback called if passed
     */
    findOne(contract, table, query, callback = null) {
        const request = {
            method: 'findOne',
            params: {
                contract,
                table,
                query,
            },
        };
        return this.call(request, callback);
    }
    /**
     * retrieve records from the table of a contract
     * @param contract contract name
     * @param table table name
     * @param query query to perform on the table
     * @param opations options
     */
    find(contract, table, query, options = { limit: 1000, offset: 0, indexes: [] }, callback = null) {
        const request = {
            method: 'find',
            params: {
                contract,
                table,
                query,
                ...options,
            },
        };
        return this.call(request, callback);
    }
}
exports.ContractsApi = ContractsApi;
//# sourceMappingURL=contracts.js.map