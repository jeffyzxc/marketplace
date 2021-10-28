import { Nft } from "./nft.interface";

export interface SkillShopListing extends Nft {
    name: string;
    description: string;
    image: string;
}

export interface LandPrice {
    Tier1: number,
    Tier2: number,
    Tier3: number 
}

export enum SkillShopNFTTypeEnum {
    T1Land = "t1land",
    T2Land = "t2land",
    T3Land = "t3land",

    Shield = "shield",

    WeaponCosmetic = "WeaponCosmetic",
    CharacterCosmetic = "CharacterCosmetic",
    
    CharacterRenameTag = "CharacterRenameTag",
    CharacterRenameTagDeal = "CharacterRenameTagDeal",
    WeaponRenameTag = "WeaponRenameTag",
    WeaponRenameTagDeal = "WeaponRenameTagDeal",
  
    CharacterEarthTraitChange = "CharacterEarthTraitChange",
    CharacterFireTraitChange = "CharacterFireTraitChange",
    CharacterWaterTraitChange = "CharacterWaterTraitChange",
    CharacterLightningTraitChange = "CharacterLightningTraitChange",
}

export function isTypeCharacterCosmetic(type: SkillShopNFTTypeEnum) : boolean {
    return type === SkillShopNFTTypeEnum.CharacterCosmetic;
}

export function isTypeWeaponCosmetic(type: SkillShopNFTTypeEnum) {
    return type === SkillShopNFTTypeEnum.WeaponCosmetic;
}

export function isTypeShield(type: SkillShopNFTTypeEnum) {
    return type === SkillShopNFTTypeEnum.Shield;
}

export function isTypeLand(type: SkillShopNFTTypeEnum) {
    return type === SkillShopNFTTypeEnum.T1Land || 
        type === SkillShopNFTTypeEnum.T2Land || 
        type === SkillShopNFTTypeEnum.T3Land
}

export function isTypeSkills(type: string) {
    return type === SkillShopNFTTypeEnum.CharacterRenameTag || 
        type === SkillShopNFTTypeEnum.CharacterRenameTagDeal || 
        type === SkillShopNFTTypeEnum.WeaponRenameTag || 
        type === SkillShopNFTTypeEnum.WeaponRenameTagDeal || 
        type === SkillShopNFTTypeEnum.CharacterEarthTraitChange ||
        type === SkillShopNFTTypeEnum.CharacterFireTraitChange || 
        type === SkillShopNFTTypeEnum.CharacterWaterTraitChange || 
        type === SkillShopNFTTypeEnum.CharacterLightningTraitChange;
}
  