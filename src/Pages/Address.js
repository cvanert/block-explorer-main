import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useParams } from 'react-router-dom';
import { Async } from 'react-async';
import { getAddressTxs } from '../services/getAddressTxs';
import { getEtherPrice } from '../services/getEtherPrice';
import { getTokenBalances } from '../services/getTokenBalances';
import { getTimestamp } from '../services/getRecency';
import { AddressHTML } from '../components/AddressHTML';
import '../styles/Address.css'

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function Address() {
    const params = useParams();

    async function getAddressDetails(address) {
        console.log(params.input);

        try {
            const balance = await alchemy.core.getBalance(params.input, "latest");
            const ethPrice = await getEtherPrice();
            const tokens = await getTokenBalances(params.input);
            const txs = await getAddressTxs(params.input);
            console.log(txs);

            return {
                address: params.input,
                latestTx: txs[0][0],
                latestTxTimestamp: getTimestamp(txs[0][0].metadata.blockTimestamp),
                earliestTx: txs[0][1],
                earliestTxTimestamp: getTimestamp(txs[0][1].metadata.blockTimestamp),
                // txs: txs[1].sort((a, b) => new Date(b.metadata.blockTimestamp) - new Date(a.metadata.blockTimestamp)),
                txs: txs[1].sort((a, b) => Date.parse(b.metadata.blockTimestamp) - Date.parse(a.metadata.blockTimestamp)),
                balance: balance ? Utils.formatEther(balance) : 0,
                usdBalance: balance && ethPrice ? (Number(Utils.formatEther(balance)) * Number(ethPrice)) : 0,
                ethPrice: ethPrice ? ethPrice : 0,
                tokens: tokens ? tokens : 0,
            }

        } catch (e) {
            console.log(e);
        }

    }
    return (
        <div className="App">
            <div className="addressHeaderContainer">
                    <div className="addressHeaderTitle">Address </div>
                    <div className="addressHeaderHash">{params.input}</div>
                </div>
            <div className="addressContainer">
                <Async promiseFn={getAddressDetails} address={params.input}>
                    {({ data, error, isPending }) => {
                        if (isPending) return "Loading..."
                        if (error) return `Something went wrong: ${error.message}`
                        if (data)
                            return (
                                <AddressHTML key={params.input} addressDetails={data} />
                            )
                        return null;
                    }}
                </Async>
            </div>
        </div >
    )
}

