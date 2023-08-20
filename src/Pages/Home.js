import { Async } from 'react-async';
import { getEtherPrice } from '../services/getEtherPrice';
import { getEtherSupply } from '../services/getEtherSupply';
import { getGasPrice } from '../services/getGasPrice';
import { getLastFinalizedBlock } from '../services/getLastFinalizedBlock';
import { getLastSafeBlock } from '../services/getLastSafeBlock';
import { getLatestBlocks } from '../services/getLatestBlocks';
import { getLatestTxs } from '../services/getLatestTxs';
import { HomeTopDataHTML } from '../components/HomeTopDataHTML';
import LatestBlocksHTML from '../components/LatestBlocksHTML';
import LatestTxsHTML from '../components/LatestTxsHTML';
import '../styles/Home.css'

// 17922038
// 0x698e5e04a709a9cf11eb8c28ada09cdd0e025b7edcc43aba7e0762bb1472236c
// 0x1140d64128Be354A2242dE0D95F424e5D7b550A5

export default function Home() {
    async function getTopData() {
        try {
            const topData = {};
            topData.etherPrice = await getEtherPrice();
            topData.etherSupply = await getEtherSupply();
            topData.gasPrice = await getGasPrice();
            topData.lastFinalizedBlock = await getLastFinalizedBlock();
            topData.lastSafeBlock = await getLastSafeBlock();

            return topData;
        } catch (e) {
            console.log(e);
        }
    }

    async function getRecentBlocks() {
        try {
            const latestBlocks = await getLatestBlocks();

            return latestBlocks;
        } catch (e) {
            console.log(e);
        }
    }

    async function getRecentTxs() {
        try {
            const latestTxs = await getLatestTxs();

            return latestTxs;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="App">
                <div className="homeDiv">
                    <div className="homeStatsContainer">
                        <Async promiseFn={getTopData}>
                            {({ data, error, isPending }) => {
                                if (isPending) return "Loading..."
                                if (error) return `Something went wrong: ${error.message}`
                                if (data)
                                    return (
                                        <HomeTopDataHTML data={data} />
                                    )
                                return null;
                            }}
                        </Async>
                    </div>
                </div>
                <div className="latestBlocksAndTxsContainer">
                    <div className="recentBlocksContainer">
                        <Async promiseFn={getRecentBlocks}>
                            {({ data, error, isPending }) => {
                                if (isPending) return "Loading..."
                                if (error) return `Something went wrong: ${error.message}`
                                if (data)
                                    return (
                                        <LatestBlocksHTML blocks={data} />
                                    )
                                return null;
                            }}
                        </Async>
                    </div>
                    <div className="recentTxsContainer">
                        <Async promiseFn={getRecentTxs}>
                            {({ data, error, isPending }) => {
                                if (isPending) return "Loading..."
                                if (error) return `Something went wrong: ${error.message}`
                                if (data)
                                    return (
                                        <LatestTxsHTML txs={data} />
                                    )
                                return null;
                            }}
                        </Async>
                    </div>
                </div>
            </div>
        </>

    );
}