import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { BigNumber } from '@ethersproject/bignumber';
import { getRecency } from '../services/getRecency';
import { getLastFinalizedBlock } from '../services/getLastFinalizedBlock';
import { getLastSafeBlock } from '../services/getLastSafeBlock';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export function BlockHTML({ block }) {
    console.log(block);
    const height = parseInt(block?.number, 16);
    const baseFeePerGas = block.baseFeePerGas ? parseInt(`${block.baseFeePerGas}`, 16) : 'N/A';
    const withdrawalsRoot = block.withdrawalsRoot ? block.withdrawalsRoot : 'N/A';

    return (
        <>
            <div className="blockContainerBlock">
                <div className="generalDetails">
                    <div className="blockHeight">
                        <label className="blockLabel">Block Height:</label>
                        <div className="blockValue">{height}</div>
                        <button className="blockButton previousBlock">
                            <Link className="blockValue linkedElement" id="blockButton" to={`/Block/0x${Number(height - 1).toString(16)}`}>◀︎</Link>
                        </button>
                        <button className="blockButton nextBlock">
                            <Link className="blockValue linkedElement" id="blockButton" to={`/Block/0x${Number(height + 1).toString(16)}`}>▶︎</Link>
                        </button>
                    </div>
                    <div className="blockStatus">
                        <label className="blockLabel">Status:</label>
                        <div className="blockValue">
                            <span id={block.status}>{block.lastFinalized ? height <= block.lastFinalized ? 'Finalized' : height <= block.lastSafe ? 'Unfinalized (Safe)' : 'Unfinalized' : 'Loading...'}</span>
                        </div>
                    </div>
                    <div className="blockTimestamp">
                        <label className="blockLabel">Timestamp:</label>
                        <div className="blockValue">{getRecency(block?.timestamp)[0]}</div>
                    </div>
                    <div className="blockTransactions">
                        <label className="blockLabel">Transactions:</label>
                        <div className="blockValue">{block?.transactions.length}</div>
                    </div>
                    <div className="blockWithdrawals">
                        <label className="blockLabel">Withdrawals:</label>
                        <div className="blockValue">{block?.withdrawals?.length}</div>
                    </div>
                </div>
                <div className="miningDetails">
                    <div className="blockMiner">
                        <label className="blockLabel">Miner/Validator:</label>
                        <Link className="blockValue linkedElement" id="blockHash" to={`/Address/${block?.miner}`}> {block?.miner}</Link>
                    </div>
                    <div className="blockReward">
                        <label className="blockLabel">Block Reward:</label>
                        <div className="blockValue">{block?.reward !== "Too many requests" && block?.reward !== undefined ? `${Utils.formatUnits(BigNumber.from(block?.reward), "ether")} ETH` : 'Loading...'}</div>
                    </div>
                    <div className="blockTotalDifficulty">
                        <label className="blockLabel">Total Difficulty:</label>
                        <div className="blockValue">{BigInt(block?.totalDifficulty).toLocaleString()}</div>
                    </div>
                    <div className="blockSize">
                        <label className="blockLabel">Size:</label>
                        <div className="blockValue">{parseInt(`${block?.size}`, 16).toLocaleString()} bytes</div>
                    </div>
                </div>
                <div className="gasDetails">
                    <div className="blockGasUsed">
                        <label className="blockLabel">Gas Used (Gwei):</label>
                        <div className="blockValue">{parseInt(`${block?.gasUsed}`, 16).toLocaleString()} ({((parseInt(`${block?.gasUsed}`, 16) / parseInt(`${block?.gasLimit}`, 16)) * 100).toFixed(2)}%)</div>
                    </div>
                    <div className="blockGasLimit">
                        <label className="blockLabel">Gas Limit (Gwei):</label>
                        <div className="blockValue">{parseInt(`${block?.gasLimit}`, 16).toLocaleString()}</div>
                    </div>
                    <div className="blockBaseFeePerGas">
                        <label className="blockLabel">Base Fee Per Gas:</label>
                        <div className="blockValue" id="blockBaseFeePerGasEther">{baseFeePerGas !== "N/A" ? `${(baseFeePerGas / 100000000000)} ETH ` : 'N/A '}</div>
                        <div className="blockValue" id="blockBaseFeePerGasGwei">({baseFeePerGas !== "N/A" ? `${baseFeePerGas.toLocaleString()} Gwei` : 'N/A'})</div>
                    </div>
                    <div className="blockBurntFees">
                        <label className="blockLabel">Burnt Fees:</label>
                        <div className="blockValue">{baseFeePerGas !== "N/A" ? `${Utils.formatEther((baseFeePerGas * block?.gasUsed).toString())} ETH` : 'N/A'}</div>
                    </div>
                    <div className="blockExtraData">
                        <label className="blockLabel">Extra Data:</label>
                        <div className="blockValue">{block?.extraData}</div>
                    </div>
                </div>
                <div className="moreDetails">
                    <div className="blockHash">
                        <label className="blockLabel">Hash:</label>
                        <div className="blockValue">{block?.hash}</div>
                    </div>
                    <div className="blockParentHash">
                        <label className="blockLabel">Parent Hash:</label>
                        <Link className="blockValue linkedElement" id="parentHash" to={`/Block/0x${Number(height - 1).toString(16)}`}>{block?.parentHash}</Link>
                    </div>
                    <div className="blockStateRoot">
                        <label className="blockLabel">StateRoot:</label>
                        <div className="blockValue">{block?.stateRoot}</div>
                    </div>
                    <div className="blockWithdrawalsRoot">
                        <label className="blockLabel">WithdrawalsRoot:</label>
                        <div className="blockValue">{withdrawalsRoot}</div>
                    </div>
                    <div className="blockNonce">
                        <label className="blockLabel">Nonce:</label>
                        <div className="blockValue">{block?.nonce}</div>
                    </div>
                </div>
            </div>
        </>
    )
}