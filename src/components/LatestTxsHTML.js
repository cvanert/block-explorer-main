import { Link } from "react-router-dom";
import { shortenAddress, shortenHash, shortenValue } from "../services/shorten";

export default function LatestTxsHTML({ txs }) {
    return (
        <div className="txsGridContainerHome">
            <div className="txsInfoLabelHome">Latest Transactions</div>
            <ul className="txsListHome">
                {txs?.map((tx) => (
                    <LatestTx key={tx.hash} {...tx} />
                ))}
            </ul>
        </div>
    );
}

const LatestTx = ({ hash, recency, from, to, amount }) => {
    return (
        <>
            <li className="txContainerHome" key={hash}>
                <div className="column1LatestTxs">
                    <div className="txHashHome">
                        <Link className="txHashHome linkedElement removeSpacingHome" to={`/Transaction/${hash}`}> {shortenHash(hash)}</Link>
                    </div>
                    <div className="recencyHome">{recency}</div>
                </div>
                <div className="column2LatestTxs">
                    <div className="fromHome">From
                        <Link className="fromHome linkedElement removeSpacing" to={`/Address/${from}`}> {shortenAddress(from)}</Link>
                    </div>
                    <div className="toHome">To
                        <Link className="toHome linkedElement removeSpacing" to={`/Address/${to}`}> {shortenAddress(to)}</Link>
                    </div>
                </div>
                <div className="column3LatestTxs">
                    <div className="flexGrowHome"></div>
                    <div className="amountHome">{`${amount} ETH`}</div>
                </div>
            </li>
        </>
    )
}