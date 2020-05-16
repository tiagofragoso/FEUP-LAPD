export const secondsToMinutesSeconds = (s) => {
    const minutes = Math.floor(s / 60);
    const seconds = new Intl.NumberFormat("pt-PT", { minimumIntegerDigits: 2 }).format(Math.floor(s - (minutes * 60)));
    return `${minutes}:${seconds}`;
};
