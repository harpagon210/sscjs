import { Client } from '../client';

const RPC_NODE = 'https://api.hive-engine.com/rpc';

describe('tokens', () => {
    it('should get the contract information', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.tokens.getContract();
        expect(response._id).toBe('tokens');
    });

    it('should get BEE balance for aggroed', async () => {
        const account = 'aggroed';
        const symbol = 'BEE';
        const client = new Client(RPC_NODE);
        const response = await client.tokens.getBalanceByAccount(account, symbol);
        expect(response.account).toEqual(account);
        expect(response.symbol).toEqual(symbol);
    });

    it('should get balances', async () => {
        const account = 'aggroed';
        const symbols = ['SWAP.HIVE', 'BEE'];
        const client = new Client(RPC_NODE);
        const response = await client.tokens.getBalancesByAccount(account, symbols);
        expect(response[0].symbol).toEqual('SWAP.HIVE');
        expect(response[1].symbol).toEqual('BEE');
    });

    it('should get tokens', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.tokens.getTokens({ limit: 10 });
        expect(response[0].symbol).toBe('BEE');
        expect(response[1].symbol).toBe('SWAP.HIVE');
        expect(response[2].symbol).toBe('ORB');
        expect(response[3].symbol).toBe('ALPHA');
        expect(response[4].symbol).toBe('BETA');
        expect(response[5].symbol).toBe('UNTAMED');
        expect(response[6].symbol).toBe('DEC');
        expect(response[7].symbol).toBe('SWAP.BTC');
        expect(response[8].symbol).toBe('SWAP.LTC');
        expect(response[9].symbol).toBe('SWAP.DOGE');
    });

    it('should get tokens via pagination', async () => {
        const client = new Client(RPC_NODE);
        let response = await client.tokens.getTokens({ limit: 2 });
        expect(response[0].symbol).toBe('BEE');
        expect(response[1].symbol).toBe('SWAP.HIVE');
        response = await client.tokens.getTokens({ limit: 2, offset: 2 });
        expect(response[0].symbol).toBe('ORB');
        expect(response[1].symbol).toBe('ALPHA');
        response = await client.tokens.getTokens({ limit: 2, offset: 4 });
        expect(response[0].symbol).toBe('BETA');
        expect(response[1].symbol).toBe('UNTAMED');
    });
});
