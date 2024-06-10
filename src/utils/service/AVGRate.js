export const calculateRate = (rate = { items: [] }) => {
    if (!Array.isArray(rate && rate?.items) || rate.items.length === 0) return 0;
    const ratesArray = rate.items.map(item => item.rate);
    let avg = ratesArray.reduce((a, b) => a + b, 0) / ratesArray.length;
    return avg;
}