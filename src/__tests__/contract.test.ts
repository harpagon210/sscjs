import { Client } from '../client';

const RPC_NODE = 'https://api.hive-engine.com/rpc';

describe('interaction with the SSC sidechain', () => {
    it('should get the contract information via callback', (done) => {
        const client = new Client(RPC_NODE);

        client.contracts.getContract('tokens', (err, res) => {
            expect(err).toBe(null);
            expect(res._id).toBe('tokens');
            done();
        });
    });

    it('should get the contract information via promise', async () => {
        const client = new Client(RPC_NODE);
        const response = await client.contracts.getContract('tokens');
        expect(response._id).toBe('tokens');
    });
});
