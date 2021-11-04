import BigNumber from 'bignumber.js';

export const fromWeiEther = (value: string | BigNumber): string => {
    return new BigNumber(value).div('1000000000000000000').toFixed();
};

export function convertStringToDecimal(val: string, maxDecimals: number) {
    return new BigNumber(val).toFixed(maxDecimals);
}

export const toBN = (value: string | number): BigNumber => {
    const valueString = typeof value === 'string' ? value : String(value);

    return new BigNumber(valueString);
};
