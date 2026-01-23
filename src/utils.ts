export function formatNumber(value: number | undefined, wholeNumber: boolean): string {
    if (value === undefined || value === null) return "0.00";
    return wholeNumber ? value.toFixed(0) : value.toFixed(2);
}
