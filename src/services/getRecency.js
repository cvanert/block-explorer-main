export function getRecency(blockTimestamp) {
    if (!blockTimestamp) return null;
    const milliseconds = Math.ceil(Date.now() - blockTimestamp * 1000);
    const date = new Date(blockTimestamp * 1000);
    const dateString = date.toLocaleString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'shortGeneric'
    });

    const d = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const h = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((milliseconds % (1000 * 60)) / 1000);

    const days = d === 1 ? `${d} day ` : `${d} days `;
    const hours = h === 1 ? `${h} hour ` : `${h} hours `;
    const minutes = m === 1 ? `${m} minute ` : `${m} minutes `;
    const seconds = s === 1 ? `${s} second ` : `${s} seconds `;
    let recency = '';

    if (d > 0) {
        recency = `${days}${hours}ago`;
    } else if (h > 0) {
        recency = `${hours}${minutes}ago`;
    } else if (m > 0) {
        recency = `${minutes}${seconds}ago`;
    } else {
        recency = `${seconds}ago`;
    }

    return [`${recency} (${dateString})`, recency];
}

export function getTimestamp(dateString) {
    const timestamp = Date.parse(dateString);
    return timestamp / 1000;
}