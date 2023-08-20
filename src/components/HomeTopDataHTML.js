import { Link } from "react-router-dom";

export function HomeTopDataHTML({ data }) {
    return (
        <>
            <div className="homeTopColumn1">
                <div className="ethPrice">
                    <label className="statLabelHomeTop">ETHER PRICE</label>
                    <div className="statValueHomeTop">{data?.etherPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}</div>
                </div>
                <div className="ethSupply">
                    <label className="statLabelHomeTop">ETHER SUPPLY</label>
                    <div className="statValueHomeTop">{data?.etherSupply}</div>
                </div>
            </div>
            <div className="homeTopColumn2">
                <div className="gasPrice">
                    <label className="statLabelHomeTop">GAS PRICE</label>
                    <div className="statValueHomeTop">{`${data?.gasPrice} Gwei`}</div>
                </div>
                <div className="lastBlocks">
                    <div className="finalizedBlock">
                        <label className="statLabelHomeTop">LAST FINALIZED BLOCK</label>
                        <div className="statValueHomeTop lastBlocksContainers">
                            <Link className="linkedElement statValueHomeTop" id="lastSafeValue" to={`/Block/0x${Number(data?.lastFinalizedBlock).toString(16)}`}>{data?.lastFinalizedBlock}</Link>
                        </div>
                    </div>
                    <div className="safeBlock">
                        <label className="statLabelHomeTop" id="lastSafeLabel">LAST SAFE BLOCK</label>
                        <div className="statValueHomeTop lastBlocksContainers" id="lastSafeDiv">
                            <div className="flexGrow"></div>
                            <Link className="linkedElement statValueHomeTop" id="lastSafeValue" to={`/Block/0x${Number(data?.lastSafeBlock).toString(16)}`}>{data?.lastSafeBlock}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}