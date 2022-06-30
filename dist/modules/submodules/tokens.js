"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensContractsApi = void 0;
class TokensContractsApi {
    contracts;
    key = 'tokens';
    constructor(contracts) {
        this.contracts = contracts;
    }
    getContract() {
        return this.contracts.getContract(this.key);
    }
    getBalanceByAccount(account, symbol) {
        return this.contracts.findOne(this.key, 'balances', { account, symbol });
    }
    getBalancesByAccount(account, symbols, options) {
        return this.contracts.find(this.key, 'balances', { account, symbol: { $in: symbols } }, options);
    }
    getBalances(query = {}, options) {
        return this.contracts.find(this.key, 'balances', query, options);
    }
    getTokens(options) {
        return this.contracts.find(this.key, 'tokens', {}, options);
    }
}
exports.TokensContractsApi = TokensContractsApi;
//# sourceMappingURL=tokens.js.map