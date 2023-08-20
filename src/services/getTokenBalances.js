import { Alchemy, Network } from 'alchemy-sdk';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


export async function getTokenBalances(address) {
    const balances = await alchemy.core.getTokenBalances(address);
    const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
    });

    const tokens = [];

    for (let token of nonZeroBalances) {
        let balance = token.tokenBalance;
        try {
            const metadata = await alchemy.core.getTokenMetadata(token.contractAddress);

            balance = balance / Math.pow(10, metadata.decimals);
            balance = balance.toFixed(2);

            if (balance > 0) {
                tokens.push({
                    name: metadata.name,
                    symbol: metadata.symbol,
                    balance: balance,
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    return tokens;
}