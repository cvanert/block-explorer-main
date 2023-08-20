import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { BigNumber } from '@ethersproject/bignumber';
import { shortenAddress, shortenValueLatest } from '../services/shorten';

export default function LatestBlocksHTML({ blocks }) {
    return (
        <>
            <div className="blocksGridContainerHome">
                <div className="blocksInfoLabelHome">Latest Blocks</div>
                <ul className="blocksListHome">
                    {blocks?.map((block) => (
                        <LatestBlock key={block.number} {...block} />
                    ))}
                </ul>
            </div>
        </>
    )
}

const LatestBlock = ({ number, miner, recency, transactions, reward }) => {
    return (
        <>
            <li className="blockContainerHome" key={number}>
                <div className="column1LatestBlocks">
                    {/* <div className="blockNumber">{number}</div> */}
                    <Link className="blockNumberHome linkedElement" to={`/Block/0x${Number(number).toString(16)}`}>{number}</Link>
                    <div className="recencyHome">{recency}</div>
                </div>
                <div className="column2LatestBlocks">
                    <div className="minerHome">Fee Recipient
                        <Link className="minerHome linkedElement removeSpacingHome" to={`/Address/${miner}`}> {shortenAddress(miner)}</Link>
                    </div>
                    <div className="transactionsHome">{`${transactions.length} transactions`}</div>
                </div>
                <div className="column3LatestBlocks">
                    <div className="flexGrowHome"></div>
                    <div className="rewardHome">{`${reward ? `${shortenValueLatest(Utils.formatUnits(BigNumber.from(reward), "ether"))} ETH` : 'Loading...'}`}</div>
                </div>
            </li>
        </>
    );
}