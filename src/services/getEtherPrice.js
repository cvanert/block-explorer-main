import axios from 'axios';

const etherscanAPIKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const etherscanEndpoint = 'https://api.etherscan.io/api';

export async function getEtherPrice() {
    const result = await axios.get(`${etherscanEndpoint}?module=stats&action=ethprice&apikey=${etherscanAPIKey}`);
    let etherPrice = result.data.result.ethusd;
    return Number(etherPrice);
}