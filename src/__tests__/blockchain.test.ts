import { Client } from '../client';

const RPC_NODE = 'https://api.hive-engine.com/rpc';

describe('interaction with the SSC sidechain', () => {
    it('should get the latest block of the sidechain', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.blockchain.getLatestBlock();
        expect(response).not.toBe(null);
    });

    it('should get the specified block from the sidechain', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.blockchain.getBlock(1);
        expect(response.blockNumber).toBe(1);
    });

    it('should get status', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.blockchain.getStatus();
        expect(response.chainId).toEqual('mainnet-hive');
        expect(response.domain).toEqual(RPC_NODE);
    });
});
