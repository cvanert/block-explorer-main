import { useEffect, useRef, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ViewportList } from 'react-viewport-list';
import { Link } from 'react-router-dom';
import { getRecency, getTimestamp } from "../services/getRecency";
import { shortenAddress, shortenAsset, shortenHash, shortenTx, shortenValue } from '../services/shorten';
import '../styles/Address.css'


let address = '';

export function AddressHTML({ addressDetails }) {
    console.log(addressDetails);
    const ref = useRef(null);

    console.log(addressDetails);
    const txs = addressDetails.txs.filter((tx, index) => {
        return index === addressDetails.txs.findIndex(t => tx.hash === t.hash);
    });
    console.log(txs);

    const tokens = addressDetails.tokens;
    console.log(tokens);

    const [pagination, setPagination] = useState({
        data: txs.map((tx, i) => (({
            id: i,
            tx: tx
        }))),
        offset: 0,
        numberPerPage: 10,
        pageCount: 0,
        currentData: []
    });

    useEffect(() => {
        setPagination((prevState) => ({
            ...prevState,
            pageCount: prevState.data.length / prevState.numberPerPage,
            currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
    }, [pagination.numberPerPage, pagination.offset]);
    const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
    }

    return (
        <>
            <div className="overviewAndMoreInfoContainer">
                <div className="overviewColumn">
                    <div className="overviewLabel">Overview</div>
                    <div className="ethBalance">
                        <label className="statLabelAddress">ETH BALANCE</label>
                        <div className="statValueAddress ethBalanceValue">{addressDetails?.balance} ETH</div>
                    </div>
                    <div className="ethValue">
                        <label className="statLabelAddress">ETH VALUE</label>
                        <div className="ethValueAddressDiv">
                            <div className="statValueAddress ethValueValue">{addressDetails?.usdBalance.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                            <div className="ethValueAddress"> (at {addressDetails?.ethPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}/ETH)</div>
                        </div>
                    </div>
                    <div className="tokensContainer">
                        <label className="statLabelAddress">TOKEN HOLDINGS</label>
                        <div className="tokensDropdown">
                            <div className="tokenScrollLabel">
                                <div className="totalTokens">{addressDetails?.tokens.length === 1 ? `${addressDetails?.tokens.length} Token` : `${addressDetails?.tokens.length} Tokens`}</div>
                                <div className="tokenInstructions">Scroll to view</div>
                            </div>
                            <div className="scrollContainer statValueAddress" ref={ref}>
                                <ViewportList viewportRef={ref} items={addressDetails?.tokens}>
                                    {(token) => (
                                        <div key={token?.symbol || "Unknown"} className="token statValueAddress">
                                            {token?.name === "" ? "" : `${token?.name}:`}    {token?.name === "" ? "" : token?.balance} {token?.symbol || ""}
                                        </div>
                                    )}
                                </ViewportList>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="moreInfoColumn">
                    <div className="moreInfoLabel">More Info</div>
                    <div className="lastTxSent">
                        <label className="statLabelAddress">LAST TRANSACTION SENT</label>
                        <div className="firstAndLastTxsSentDiv">
                            <Link className="statValueAddress latestTxAddress linkedElement" to={`/Transaction/${addressDetails?.latestTx.hash}`}> {shortenTx(addressDetails?.latestTx.hash)}</Link>
                            <div className="latestTxTime statValueAddress">from {getRecency(addressDetails?.latestTxTimestamp)[1]}</div>
                        </div>
                    </div>
                    <div className="firstTxSent">
                        <label className="statLabelAddress">FIRST TRANSACTION SENT</label>
                        <div className="firstAndLastTxsSentDiv">
                            <Link className="statValueAddress earliestTxAddress linkedElement" to={`/Transaction/${addressDetails?.earliestTx.hash}`}> {shortenTx(addressDetails?.earliestTx.hash)}</Link>
                            <div className="earliestTxTime statValueAddress">from {getRecency(addressDetails?.earliestTxTimestamp)[1]}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="addressTxsContainer">
                <div className='addressTxs'>
                    <div className='addressTxsTitle'>TRANSACTIONS</div>
                    <table>
                        <thead>
                            <tr className="theadRow">
                                <td className="addressTxHash thead" key="txHash">Transaction Hash</td>
                                <td className="addressTxCategory thead" key="txCategory">Category</td>
                                <td className="addressTxBlock thead" key="txBlock">Block</td>
                                <td className="addressTxAge thead" key="txAge">Age</td>
                                <td className="addressTxFrom thead" key="txFrom">From</td>
                                <td className="addressTxDirection thead" key="txDirection"></td>
                                <td className="addressTxTo thead" key="txTo">To</td>
                                <td className="addressTxValue thead" key="txValue">Value</td>
                                <td className="addressTxAsset thead" key="txAsset">Asset</td>
                            </tr>
                        </thead>
                        <tbody>
                            {pagination.currentData && pagination.currentData.map(((tx, i) => (
                                <TxHTML key={tx.uniqueId} {...tx} />
                            )))
                            }
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={pagination.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                    />
                </div>

            </div>
        </>
    )
}

const TxHTML = ({ tx }) => {
    return (
        <>
            <tr key={tx?.uniqueId}>
                <td className="addressTxHash" key={`${tx?.uniqueId}hash`}>
                    <Link className="addressTxHash linkedElement removeSpacingHome" to={`/Transaction/${tx?.hash}`}> {shortenHash(tx?.hash)}</Link>
                </td>
                <td className="addressTxCategory" key={`${tx?.uniqueId}category`}>{tx?.category}</td>
                <td className="addressTxBlock" key={`${tx?.uniqueId}block`}>
                    <Link className="addressTxBlock linkedElement" id="parentHash" to={`/Block/${tx?.blockNum}`}>{parseInt(`${tx?.blockNum}`, 16)}</Link>
                </td>
                <td className="addressTxAge" key={`${tx?.uniqueId}age`}>{getRecency(getTimestamp(tx?.metadata?.blockTimestamp))[1]}</td>
                <td className="addressTxFrom" key={`${tx?.uniqueId}from`}>
                    <Link className="addressTxFrom linkedElement" id="blockHash" to={`/Address/${tx?.from}`}> {shortenAddress(tx?.from)}</Link>
                </td>
                <td className="addressTxDirection" key={`${tx?.uniqueId}direction`} >
                    <span key={`${tx?.uniqueId}directionspan`} className='txDirection'>{`${tx?.from === tx?.to ? "SELF" : tx?.to.toLowerCase() === address.toLowerCase() ? "IN" : "OUT"} `}</span>
                </td>
                <td className="addressTxTo" key={`${tx?.uniqueId}to`}>
                    <Link className="addressTxTo linkedElement" id="blockHash" to={`/Address/${tx?.to}`}> {shortenAddress(tx?.to)}</Link>
                </td>
                <td className="addressTxAmount" key={`${tx?.uniqueId}value`}>{shortenValue(tx?.value)}</td>
                <td className="addressTxAsset" key={`${tx?.uniqueId}asset`}>{shortenAsset(tx?.asset)}</td>
            </tr>
        </>
    )
}