import { Alchemy, Network, Utils } from 'alchemy-sdk';
import { useParams } from 'react-router-dom';
import { Async } from 'react-async';
import { TxHTML } from '../components/TxHTML';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export default function Tx() {
  const params = useParams();

  async function getTx(txHash) {
    try {
      const txObjectArray = [];
      const txReceipt = await alchemy.core.getTransactionReceipt(params.input);
      const txResponse = await alchemy.core.getTransaction(params.input);

      txObjectArray.push({ ...txReceipt, ...txResponse });
      const block = await alchemy.core.getBlock(txObjectArray[0].blockNumber);

      txObjectArray[0].timestamp = block.timestamp;
      txObjectArray[0].baseFeePerGas = block.baseFeePerGas ? Utils.formatUnits(block.baseFeePerGas, "gwei") : undefined;

      return txObjectArray.map(({ baseFeePerGas, blockHash, blockNumber, confirmations, data, from, gasLimit, effectiveGasPrice, gasUsed, hash, maxFeePerGas, maxPriorityFeePerGas, nonce, status, timestamp, to, transactionHash, transactionIndex, type, value }) => ({
        baseFeePerGas: baseFeePerGas ? baseFeePerGas : 'N/A',
        blockHash,
        blockNumber,
        confirmations,
        data,
        from,
        gasLimit: Utils.formatUnits(gasLimit, "gwei"), gasPrice: Utils.formatUnits(effectiveGasPrice, "gwei"),
        gasPriceEther: Utils.formatUnits(effectiveGasPrice, "ether"),
        gasUsed: Utils.formatUnits(gasUsed, "gwei"),
        hash,
        maxFeePerGas: maxFeePerGas ? Utils.formatUnits(maxFeePerGas, "gwei") : 'N/A',
        maxPriorityFeePerGas: maxPriorityFeePerGas ? Utils.formatUnits(maxPriorityFeePerGas, "ether") : 'N/A',
        nonce,
        status,
        timestamp,
        to,
        transactionHash,
        transactionIndex,
        type,
        value: Utils.formatUnits(value, "ether")
      }));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="App">
        <div className="txHeaderContainer">
          <div className="txHeaderTitle">Transaction Details </div>
        </div>
          <Async promiseFn={getTx} txHash={params.input}>
            {({ data, error, isPending }) => {
              if (isPending) return "Loading..."
              if (error) return `Something went wrong: ${error.message}`
              if (data)
                return (
                  <TxHTML tx={data[0]} />
                )
              return null;
            }}
          </Async>
        </div>
    </>
  )
}