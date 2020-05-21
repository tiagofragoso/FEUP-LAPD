export const calculatePopularityRatios = (value, max, divisions) => {
    const ratios = [];
    const maxPerDivision = Math.floor(max / divisions);
    for (let i = 0; i < divisions; i++) {
        const v = value - (i * maxPerDivision);
        ratios.push((v > maxPerDivision ? maxPerDivision : Math.max(0, v)) / maxPerDivision);
    }
    return ratios;
};

export default calculatePopularityRatios;
