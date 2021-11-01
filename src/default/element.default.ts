import { INameValue } from "@/interface/common.interface";
import { NULL_FILTER_VALUE } from "./common.default";

export const EARTH_WEAPON_ELEMENT_VALUE = "earth";
export const FIRE_WEAPON_ELEMENT_VALUE = "fire";
export const LIGHTNING_WEAPON_ELEMENT_VALUE = "lightning";
export const WATER_WEAPON_ELEMENT_VALUE = "water";

export const EARTH_WEAPON_ELEMENT_NUMBER_VALUE = 1;
export const FIRE_WEAPON_ELEMENT_NUMBER_VALUE = 0;
export const LIGHTNING_WEAPON_ELEMENT_NUMBER_VALUE = 2;
export const WATER_WEAPON_ELEMENT_NUMBER_VALUE = 3;

export const EARTH_WEAPON_ELEMENT_NAME = "Earth";
export const FIRE_WEAPON_ELEMENT_NAME = "Fire";
export const LIGHTNING_WEAPON_ELEMENT_NAME = "Lightning";
export const WATER_WEAPON_ELEMENT_NAME = "Water";

export const WeaponElementList: Array<INameValue<string>> = [
    {
        name : EARTH_WEAPON_ELEMENT_NAME,
        value: EARTH_WEAPON_ELEMENT_VALUE
    },
    {
        name : FIRE_WEAPON_ELEMENT_NAME,
        value: FIRE_WEAPON_ELEMENT_VALUE
    },
    {
        name : LIGHTNING_WEAPON_ELEMENT_NAME,
        value: LIGHTNING_WEAPON_ELEMENT_VALUE
    },
    {
        name : WATER_WEAPON_ELEMENT_NAME,
        value: WATER_WEAPON_ELEMENT_VALUE
    }
];

export function getElementNameByValue(val: string) {
    if(val === EARTH_WEAPON_ELEMENT_VALUE) {
        return EARTH_WEAPON_ELEMENT_NAME;
    } else if(val === FIRE_WEAPON_ELEMENT_VALUE) {
        return FIRE_WEAPON_ELEMENT_NAME;
    } else if(val === LIGHTNING_WEAPON_ELEMENT_VALUE) {
        return LIGHTNING_WEAPON_ELEMENT_NAME;
    } else if(val === WATER_WEAPON_ELEMENT_VALUE) {
        return WATER_WEAPON_ELEMENT_NAME;
    }

    return EARTH_WEAPON_ELEMENT_NAME;
}

export function getElementNumberValueByName(val: string) : number  {
    if(val === FIRE_WEAPON_ELEMENT_NAME) {
        return FIRE_WEAPON_ELEMENT_NUMBER_VALUE;
    } else if(val === EARTH_WEAPON_ELEMENT_NAME) {
        return EARTH_WEAPON_ELEMENT_NUMBER_VALUE;
    } else if(val === LIGHTNING_WEAPON_ELEMENT_NAME) {
        return LIGHTNING_WEAPON_ELEMENT_NUMBER_VALUE;
    } else if(val === WATER_WEAPON_ELEMENT_NAME) {
        return WATER_WEAPON_ELEMENT_NUMBER_VALUE;
    }

    return NULL_FILTER_VALUE;
}

export function getElementNumberToName(elementNum: number): string {  
    if(elementNum === FIRE_WEAPON_ELEMENT_NUMBER_VALUE) {
        return FIRE_WEAPON_ELEMENT_NAME;
    } else if(elementNum === EARTH_WEAPON_ELEMENT_NUMBER_VALUE) {
        return EARTH_WEAPON_ELEMENT_NAME;
    } else if(elementNum === LIGHTNING_WEAPON_ELEMENT_NUMBER_VALUE) {
        return LIGHTNING_WEAPON_ELEMENT_NAME;
    } else if(elementNum === WATER_WEAPON_ELEMENT_NUMBER_VALUE) {
        return WATER_WEAPON_ELEMENT_NAME;
    }

    return '???';
}

export enum WeaponTrait {
    STR = 0,
    DEX = 1,
    CHA = 2,
    INT = 3,
    PWR = 4
}
