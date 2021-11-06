import { toBN } from "./common";
import BigNumber from 'bignumber.js';

export function truncateDecimals(skill: string | number, skillMinDecimals = 2, skillMaxDecimals = 4): string {
    const parsedSkill = toBN(skill);
    const decimalPlaces = countDecimalPlaces(parsedSkill);

    if (skillMaxDecimals < decimalPlaces) {
      return `${parsedSkill.toFixed(skillMaxDecimals)}`;
    }

    if (
      decimalPlaces > skillMinDecimals &&
      decimalPlaces <= skillMaxDecimals
    ) {
      return parsedSkill.toString();
    }

    return parsedSkill.toFixed(skillMinDecimals);
}

export function countDecimalPlaces(value: BigNumber) {
    if (Math.floor(+value.valueOf()).toString() === value.valueOf()) return 0;
    return value.toString().split('.')[1].length || 0;
}