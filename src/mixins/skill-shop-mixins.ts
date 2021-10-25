import { 
    isTypeCharacterCosmetic, 
    isTypeShield, 
    isTypeSkills, 
    isTypeWeaponCosmetic, 
    SkillShopNFTTypeEnum 
} from '@/interface/shop.inteface';

export const skillShopMixins = {
    methods: {
        isTypeCharacterCosmetic(type: SkillShopNFTTypeEnum) : boolean {
            return isTypeCharacterCosmetic(type);
        },
        isTypeWeaponCosmetic(type: SkillShopNFTTypeEnum) {
            return isTypeWeaponCosmetic(type);
        },
        isTypeShield(type: SkillShopNFTTypeEnum) {
            return isTypeShield(type);
        },
        isTypeSkills(type: SkillShopNFTTypeEnum) {
            return isTypeSkills(type);
        }
    }
};
