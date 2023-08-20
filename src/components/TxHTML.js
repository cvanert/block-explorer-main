import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { BigNumber } from '@ethersproject/bignumber';
import { getRecency } from '../services/getRecency';
import '../styles/Tx.css'

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export function TxHTML({ tx }) {
    const txFee = tx?.gasPrice !== 'N/A' && tx?.gasUsed !== 'N/A' ? tx?.gasPrice * tx?.gasUsed : 'N/A';
    const burntFees = tx?.baseFeePerGas !== 'N/A' && tx?.gasUsed !== 'N/A' ? tx?.baseFeePerGas * tx?.gasUsed : 'N/A';
    const txSavings = tx?.maxFeePerGas !== 'N/A' && tx?.gasUsed !== 'N/A' && tx?.gasPrice !== 'N/A' ? (tx?.maxFeePerGas * tx?.gasUsed) - (tx?.gasPrice * tx?.gasUsed) : 'N/A';

    return (
        <>
            <div className="txContainer">
                <div className="txContainerTx">
                    <div className="generalDetails">
                        <div className="txHashTx">
                            <label className="txLabel">Transaction Hash:</label>
                            <div className="txValue">{tx?.hash}</div>
                        </div>
                        <div className="txStatus">
                            <label className="txLabel">Status:</label>
                            <div className="txValue">{tx?.status}</div>
                        </div>
                        <div className="txBlock">
                            <label className="txLabel">Block:</label>
                            <Link className="txValue linkedElement" id="txBlock" to={`/Block/0x${Number(tx?.blockNumber).toString(16)}`}>{tx?.blockNumber}</Link>
                        </div>
                        <div className="txTimestamp">
                            <label className="txLabel">Timestamp:</label>
                            <div className="txValue">{getRecency(tx?.timestamp)[0]}</div>
                        </div>
                        <div className="txFrom">
                            <label className="txLabel">From:</label>
                            <Link className="txValue linkedElement" id="txFrom" to={`/Address/${tx?.from}`}> {tx?.from}</Link>
                        </div>
                        <div className="txTo">
                            <label className="txLabel">To:</label>
                            <Link className="txValue linkedElement" id="txTo" to={`/Address/${tx?.to}`}> {tx?.to}</Link>
                        </div>
                    </div>
                    <div className="txAmount">
                        <label className="txLabel">Value:</label>
                        <div className="txValue">{tx?.value} ETH</div>
                    </div>
                    <div className="txFee">
                        <label className="txLabel">Transaction Fee:</label>
                        <div className="txValue">{txFee} ETH</div>
                    </div>
                    <div className="txGasPrice">
                        <label className="txLabel">Gas Price:</label>
                        <div className="txValue">{`${tx?.gasPrice.toLocaleString()} Gwei (${tx?.gasPriceEther.toLocaleString()} ETH)`}</div>
                    </div>
                </div>
            </div>
            <div className="txContainer txContainer2">
                <div className="txContainerTx">
                    <div className="moreDetails">
                        <div className="txGas">
                            <div className="txGasLimitAndUsage">
                                <label className="txLabel">Gas Limit and Usage by Transaction:</label>
                                <div className="txValue txGasLimitAndUsageValue">
                                    <div className="txValue" id="gasLimit">{(tx?.gasLimit * 1000000000).toLocaleString()}</div>|
                                    <div className="txValue" id="gasUsage"></div>{(tx?.gasUsed * 1000000000).toLocaleString()} ({((tx?.gasUsed / tx?.gasLimit) * 100).toFixed(2)}%)</div>
                            </div>
                            <div className="txGasFees">
                                <label className="txLabel">Gas Fees:</label>
                                <div className="txValue txGasFeesValue">
                                    <div className="txGasFeesBase">Base: {tx?.baseFeePerGas?.toLocaleString()} Gwei </div>|
                                    <div className="txGasFeesMax">Max: {tx?.maxFeePerGas.toLocaleString()} Gwei </div>|
                                    <div className="txGasFeesMaxPriority">Max Priority: {tx?.maxPriorityFeePerGas?.toLocaleString()} ETH</div>
                                </div>
                            </div>
                            <div className="txBurntFeesAndSavings">
                                <label className="txLabel">Burnt Fees & Transaction Savings:</label>
                                <div className="txValue txBurntFeesAndSavingsValue">
                                    <div className="txBurntFees">Burnt: {burntFees} ETH </div>|
                                    <div className="txSavings">Savings: {txSavings} ETH </div>
                                </div>
                            </div>
                        </div>
                        <div className="otherAttributes">
                        <label className="txLabel">Other Attributes:</label>
                                <div className="txValue otherAttributesValue">
                                    <div className="txType">Type: {tx?.type}</div>|
                                    <div className="txNonce">Nonce: {tx?.nonce}</div>|
                                    <div className="txPosition">Max Priority: {tx?.transactionIndex}</div>
                                </div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}