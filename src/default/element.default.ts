import { INameValue } from "@/interface/common.interface";

export const EARTH_WEAPON_ELEMENT_VALUE = "earth";
export const FIRE_WEAPON_ELEMENT_VALUE = "fire";
export const LIGHTNING_WEAPON_ELEMENT_VALUE = "lightning";
export const WATER_WEAPON_ELEMENT_VALUE = "water";

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
