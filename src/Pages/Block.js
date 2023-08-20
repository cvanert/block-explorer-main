import { Alchemy, Network } from 'alchemy-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Async } from 'react-async';
import { getBlockReward } from '../services/getLatestBlocks';
import { getLastFinalizedBlock } from '../services/getLastFinalizedBlock';
import { getLastSafeBlock } from '../services/getLastSafeBlock';
import { BlockHTML } from '../components/BlockHTML';
import '../styles/Block.css'

//17894079

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const etherscanAPIKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const etherscanEndpoint = 'https://api.etherscan.io/api';

export default function Block() {
    const params = useParams();
    const [b, setB] = useState();
    async function getBlock(hex) {
        let block = {};

        try {
            const inputNumber = parseInt(params.input, 16);
            console.log(inputNumber)

            const result = await axios.get(`${etherscanEndpoint}?module=proxy&action=eth_getBlockByNumber&tag=${params.input}&boolean=true&apikey=${etherscanAPIKey}`);

            block = await result.data.result;

            getBlockReward(inputNumber)
                .then((res) => {
                    if (res.data.message === "NOTOK" || res.data.message === "No record found") {
                        block['reward'] = "Too many requests";
                    } else {
                        block['reward'] = res.data.result.blockReward;
                    }
                }).catch((e) => {
                    console.log(e);
                });

            getLastFinalizedBlock()
                .then((res) => {
                    block['lastFinalized'] = res;
                }).catch((e) => {
                    console.log(e);
                })

            getLastSafeBlock()
                .then((res) => {
                    block['lastSafe'] = res;
                }).catch((e) => {
                    console.log(e);
                })

            return block;
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className="App">
                <div className="blockHeaderContainer">
                    <div className="blockHeaderTitle">Block </div>
                    <div className="blockHeaderNumber">#{parseInt(`${params.input}`, 16)}</div>
                </div>
                <div className="blockContainer">
                    <Async promiseFn={getBlock} hex={params.input}>
                        {({ data, error, isPending }) => {
                            if (isPending) return "Loading..."
                            if (error) return `Something went wrong: ${error.message}`
                            if (data)
                                return (
                                    <BlockHTML key={params.input} block={data} />
                                )
                            return null;
                        }}
                    </Async>
                </div>
            </div >
        </>
    )
}