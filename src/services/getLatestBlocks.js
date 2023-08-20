import { Alchemy, Network, Utils } from 'alchemy-sdk';
import axios from 'axios';
import { getRecency } from './getRecency';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const etherscanAPIKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const etherscanEndpoint = 'https://api.etherscan.io/api';

export async function getBlockReward(lastBlock) {
    const result = await axios.get(`${etherscanEndpoint}?module=block&action=getblockreward&blockno=${await lastBlock}&apikey=${etherscanAPIKey}`);
    const resolvedReward = Promise.resolve(result);
    return await resolvedReward;
}

export async function getLatestBlocks() {
    const lastBlock = await alchemy.core.getBlockNumber();
    const blocks = [];
    const rewardedBlocks = {};

    for (let i = 0; i < 6; i++) {
        blocks.push(alchemy.core.getBlock(lastBlock - i));
        await getBlockReward(lastBlock - i)
        .then((res) => {
            if (res.data.message === "NOTOK" || res.data.message == "No record found") {
                return "Too many requests";
            } else {
                rewardedBlocks[`${lastBlock - i}`] = res.data.result.blockReward;
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    const resolvedBlocks = await Promise.all(blocks);

    return resolvedBlocks.map(({ number, miner, timestamp, transactions }, i) => ({
        number,
        miner,
        recency: getRecency(timestamp)[1],
        transactions,
        reward: rewardedBlocks[number]
    }));
};