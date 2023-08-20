import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export async function getLastFinalizedBlock() {
    const block = await alchemy.core.getBlock("finalized");
    return block.number;
}