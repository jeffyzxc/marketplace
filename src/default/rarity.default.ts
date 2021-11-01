import { INameValue } from "@/interface/common.interface";

export const LEGENDARY_ITEM_RARITY_VALUE = 5;
export const MYTHICAL_ITEM_RARITY_VALUE = 4;
export const UNIQUE_ITEM_RARITY_VALUE = 3;
export const RARE_ITEM_RARITY_VALUE = 2;
export const NORMAL_ITEM_RARITY_VALUE = 1;

export const LEGENDARY_ITEM_RARITY_NAME = "Legendary";
export const MYTHICAL_ITEM_RARITY_NAME = "Mythical";
export const UNIQUE_ITEM_RARITY_NAME = "Unique";
export const RARE_ITEM_RARITY_NAME = "Rare";
export const NORMAL_ITEM_RARITY_NAME = "Normal";

export const ItemRarityList: Array<INameValue<number>> = [
    {
        name : NORMAL_ITEM_RARITY_NAME,
        value: NORMAL_ITEM_RARITY_VALUE
    },
    {
        name : RARE_ITEM_RARITY_NAME,
        value: RARE_ITEM_RARITY_VALUE
    },
    {
        name : UNIQUE_ITEM_RARITY_NAME,
        value: UNIQUE_ITEM_RARITY_VALUE
    },
    {
        name : MYTHICAL_ITEM_RARITY_NAME,
        value: MYTHICAL_ITEM_RARITY_VALUE
    },
    {
        name: LEGENDARY_ITEM_RARITY_NAME,
        value: LEGENDARY_ITEM_RARITY_VALUE
    }
];

export function getRarityNameByValue(val: number) {
    if(val === NORMAL_ITEM_RARITY_VALUE) {
        return NORMAL_ITEM_RARITY_NAME;
    } else if(val === RARE_ITEM_RARITY_VALUE) {
        return RARE_ITEM_RARITY_NAME;
    } else if(val === UNIQUE_ITEM_RARITY_VALUE) {
        return UNIQUE_ITEM_RARITY_NAME;
    } else if(val === MYTHICAL_ITEM_RARITY_VALUE) {
        return MYTHICAL_ITEM_RARITY_NAME;
    } else if(val === LEGENDARY_ITEM_RARITY_VALUE) {
        return LEGENDARY_ITEM_RARITY_NAME;
    }

    return NORMAL_ITEM_RARITY_NAME;
}

export interface IItemRarity {
    Name: string;
    Value: number;
}
