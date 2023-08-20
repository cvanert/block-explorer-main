export function shortenAddress(address) {
    const first = address.slice(0, 9);
    const last = address.slice(-8);
    return `${first}...${last}`
}

export function shortenHash(hash) {
    return `${hash.slice(0, 19)}...`
}

export function shortenValue(value) {
    const string = `${value}`;
    return string.length > 10 ? string.slice(0,11) : value;
}

export function shortenValueLatest(value) {
    const string = `${value}`;
    return string.length > 7 ? Number(string.slice(0,8)) : value;
}

export function shortenTx(txHash) {
    return `${txHash.slice(0, 16)}...`
}

export function shortenAsset(asset) {
    return asset.length > 10 ? `${asset.slice(0,11)}...` : asset;
}