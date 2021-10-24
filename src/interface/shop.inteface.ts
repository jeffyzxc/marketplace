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