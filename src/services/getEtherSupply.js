import axios from 'axios';

const etherscanAPIKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const etherscanEndpoint = 'https://api.etherscan.io/api';

export async function getEtherSupply() {
    const result = await axios.get(`${etherscanEndpoint}?module=stats&action=ethsupply&apikey=${etherscanAPIKey}`);
    let etherSupply = result.data.result;
    return Number(etherSupply).toLocaleString();
}