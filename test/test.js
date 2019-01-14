import SSC from '../lib/ssc';

const SSC_RPC_NODE = 'https://steemsmartcontracts.tk:5000';

describe('interaction with the SSC sidechain', () => {
  it('should get the contract information via callback', done => {
    const ssc = new SSC(SSC_RPC_NODE);

    ssc.getContractInfo('accounts', (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe('accounts');
      done();
    });
  });

  it('should get the contract information via promise', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.getContractInfo('accounts');
    expect(response.name).toBe('accounts');
  });

  it('should get a record from a table', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.findOne('accounts', 'accounts', { 'id': 'harpagon' });
    expect(response.id).toBe('harpagon');
  });

  it('should get records from a table', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.find('tokens', 'tokens', { });
    expect(response[0].symbol).toBe('PKTC');
    expect(response[1].symbol).toBe('SMMT');
  });

  it('should get records from a table via pagination', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    let response = await ssc.find('tokens', 'tokens', { }, 2);
    expect(response[0].symbol).toBe('PKTC');
    expect(response[1].symbol).toBe('SMMT');
    response = await ssc.find('token', 'tokens', { }, 2, 2);
    expect(response[0].symbol).toBe('SMMKT');
    expect(response[1].symbol).toBe('SMTT');
    response = await ssc.find('token', 'tokens', { }, 2, 4);
    expect(response.length).toBe(0);
  });

  it('should get the latest block of the sidechain', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.getLatestBlockInfo();
    expect(response).not.toBe(null);
  });

  it('should get the specified block from the sidechain', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.getBlockInfo(1);
    expect(response.blockNumber).toBe(1);
  });
});