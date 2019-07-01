import SSC from '../lib/ssc';

const SSC_RPC_NODE = 'https://api.steem-engine.com/rpc/';

describe('interaction with the SSC sidechain', () => {
  it('should get the contract information via callback', done => {
    const ssc = new SSC(SSC_RPC_NODE);

    ssc.getContractInfo('tokens', (err, res) => {
      expect(err).toBe(null);
      expect(res.name).toBe('tokens');
      done();
    });
  });

  it('should get the contract information via promise', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.getContractInfo('tokens');
    expect(response.name).toBe('tokens');
  });

  it('should get a record from a table', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.findOne('tokens', 'balances', { 'account': 'steemsc', 'symbol': 'ENG' });
    expect(response.account).toBe('steemsc');
    expect(response.symbol).toBe('ENG');
  });

  it('should get records from a table', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    const response = await ssc.find('tokens', 'tokens', { }, 10, 0);

    expect(response[0].symbol).toBe('ENG');
    expect(response[1].symbol).toBe('STEEMP');
    expect(response[2].symbol).toBe('BTCP');
    expect(response[3].symbol).toBe('LTCP');
    expect(response[4].symbol).toBe('DOGEP');
    expect(response[5].symbol).toBe('BCHP');
    expect(response[6].symbol).toBe('SMTT');
    expect(response[7].symbol).toBe('BUX');
    expect(response[8].symbol).toBe('STYLE');
    expect(response[9].symbol).toBe('FREEX');
  });

  it('should get records from a table via pagination', async () => {
    const ssc = new SSC(SSC_RPC_NODE);
    let response = await ssc.find('tokens', 'tokens', { }, 2);
    expect(response[0].symbol).toBe('ENG');
    expect(response[1].symbol).toBe('STEEMP');
    response = await ssc.find('tokens', 'tokens', { }, 2, 2);
    expect(response[0].symbol).toBe('BTCP');
    expect(response[1].symbol).toBe('LTCP');
    response = await ssc.find('tokens', 'tokens', { }, 2, 4);
    expect(response[0].symbol).toBe('DOGEP');
    expect(response[1].symbol).toBe('BCHP');
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