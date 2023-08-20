import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { getRecency } from './getRecency';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export async function getLatestTxs() {
    const lastBlock = await alchemy.core.getBlockWithTransactions('latest');
    const timestamp = lastBlock.timestamp;
    const txs = [];

    for (let i = 0; i < 6; i++) {
        txs.push(lastBlock.transactions[i]);
    }

    const resolvedTx = await Promise.all(txs);

    return resolvedTx.map(({ hash, from, to, value }) => ({
        hash,
        recency: getRecency(timestamp)[1],
        from,
        to,
        amount: Utils.formatEther(value._hex)
    }));
};