import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export async function getAddressTxs(address) {
    const from = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        order: "desc",
        fromAddress: address,
        excludeZeroValue: true,
        category: ['internal', 'external', 'erc20', 'erc721', 'erc1155'],
        withMetadata: true
    });

    const to = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toBlock: "latest",
        order: "desc",
        toAddress: address,
        excludeZeroValue: true,
        category: ['internal', 'external', 'erc20', 'erc721', 'erc1155'],
        withMetadata: true
    });

    const transfers = [[from.transfers[0], from.transfers[from.transfers.length - 1]],[...from.transfers, ...to.transfers]];
    console.log(transfers);

    return transfers;
}
