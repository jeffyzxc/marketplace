import { INameValue } from "@/interface/common.interface";

export const LEGENDARY_WEAPON_RARITY_VALUE = 5;
export const MYTHICAL_WEAPON_RARITY_VALUE = 4;
export const UNIQUE_WEAPON_RARITY_VALUE = 3;
export const RARE_WEAPON_RARITY_VALUE = 2;
export const NORMAL_WEAPON_RARITY_VALUE = 1;

export const LEGENDARY_WEAPON_RARITY_NAME = "Legendary";
export const MYTHICAL_WEAPON_RARITY_NAME = "Mythical";
export const UNIQUE_WEAPON_RARITY_NAME = "Unique";
export const RARE_WEAPON_RARITY_NAME = "Rare";
export const NORMAL_WEAPON_RARITY_NAME = "Normal";

export const WeaponRarityList: Array<INameValue<number>> = [
    {
        name : NORMAL_WEAPON_RARITY_NAME,
        value: NORMAL_WEAPON_RARITY_VALUE
    },
    {
        name : RARE_WEAPON_RARITY_NAME,
        value: RARE_WEAPON_RARITY_VALUE
    },
    {
        name : UNIQUE_WEAPON_RARITY_NAME,
        value: UNIQUE_WEAPON_RARITY_VALUE
    },
    {
        name : MYTHICAL_WEAPON_RARITY_NAME,
        value: MYTHICAL_WEAPON_RARITY_VALUE
    },
    {
        name: LEGENDARY_WEAPON_RARITY_NAME,
        value: LEGENDARY_WEAPON_RARITY_VALUE
    }
];

export function getWeaponRarityNameByValue(val: number) {
    if(val === NORMAL_WEAPON_RARITY_VALUE) {
        return NORMAL_WEAPON_RARITY_NAME;
    } else if(val === RARE_WEAPON_RARITY_VALUE) {
        return RARE_WEAPON_RARITY_NAME;
    } else if(val === UNIQUE_WEAPON_RARITY_VALUE) {
        return UNIQUE_WEAPON_RARITY_NAME;
    } else if(val === MYTHICAL_WEAPON_RARITY_VALUE) {
        return MYTHICAL_WEAPON_RARITY_NAME;
    } else if(val === LEGENDARY_WEAPON_RARITY_VALUE) {
        return LEGENDARY_WEAPON_RARITY_NAME;
    }

    return NORMAL_WEAPON_RARITY_NAME;
}


export interface IWeaponRarity {
    Name: string;
    Value: number;
}
