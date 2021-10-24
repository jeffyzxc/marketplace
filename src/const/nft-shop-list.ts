import { LandPrice, SkillShopListing } from "@/interface/shop.inteface";

export function nftList(): Array<SkillShopListing>  {
  return [
    {
      id: 0,
      type: 'CharacterRenameTag',
      nftPrice: 0.1,
      name: 'Rename Tag',
      description: 'Renames one character.',
      image: 'scroll_06_te.png'
    },
    {
      id: 0,
      type: 'CharacterRenameTagDeal',
      nftPrice: 0.3,
      name: 'Rename Tag Deal',
      description: 'Renames 4 characters for the price of 3.',
      image: 'scroll_06_te4.png'
    },
    {
      id: 1,
      type: 'WeaponRenameTag',
      nftPrice: 0.1,
      name: 'Weapon Tag',
      description: 'Renames a weapon.',
      image: 'rune_05_te.png'
    },
    {
      id: 1,
      type: 'WeaponRenameTagDeal',
      nftPrice: 0.3,
      name: 'Weapon Tag Deal',
      description: 'Renames 4 weapons for the price of 3.',
      image: 'rune_05_te4.png'
    },
    {
      id: 1,
      type: 'CharacterEarthTraitChange',
      nftPrice: 0.2,
      name: 'Earth Character Trait',
      description: 'Changes character\'s trait to Earth.',
      image: 'potion_06_te.png'
    },
    {
      id: 1,
      type: 'CharacterFireTraitChange',
      nftPrice: 0.2,
      name: 'Fire Character Trait',
      description: 'Changes character\'s trait to Fire.',
      image: 'potion_09_te.png'
    },
    {
      id: 1,
      type: 'CharacterWaterTraitChange',
      nftPrice: 0.2,
      name: 'Water Character Trait',
      description: 'Changes character\'s trait to Water.',
      image: 'potion_07_te.png'
    },
    {
      id: 1,
      type: 'CharacterLightningTraitChange',
      nftPrice: 0.2,
      name: 'Lightning Character Trait',
      description: 'Changes character\'s trait to Lightning.',
      image: 'potion_05_te.png'
    },
    {
      id: 1,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Weapon Grayscale',
      description: '',
      image: ''
    },
    {
      id: 2,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Weapon Contrast',
      description: 'Increased contrast',
      image: ''
    },
    {
      id: 3,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Weapon Sepia',
      description: '',
      image: ''
    },
    {
      id: 4,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Weapon Invert',
      description: 'Inverted colors',
      image: ''
    },
    {
      id: 5,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Weapon Blur',
      description: 'Blurred weapon',
      image: ''
    },
    {
      id: 6,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Fire Glow',
      description: 'Glows with fire power',
      image: ''
    },
    {
      id: 7,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Earth Glow',
      description: 'Glows with earth power',
      image: ''
    },
    {
      id: 8,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Lightning Glow',
      description: 'Glows with lightning power',
      image: ''
    },
    {
      id: 9,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Water Glow',
      description: 'Glows with water power',
      image: ''
    },
    {
      id: 10,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Rainbow Glow',
      description: 'Glows with all elements powers',
      image: ''
    },
    {
      id: 11,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Dark Glow',
      description: 'Glows with the dark',
      image: ''
    },
    {
      id: 12,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Ghost Weapon',
      description: 'Ghost effect',
      image: ''
    },
    {
      id: 13,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Police Lights',
      description: 'Police Lights background',
      image: ''
    },
    {
      id: 14,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Neon Border',
      description: '',
      image: ''
    },
    {
      id: 15,
      type: 'WeaponCosmetic',
      nftPrice: 0.5,
      name: 'Weapon Rotating Neon Border',
      description: '',
      image: ''
    },
    {
      id: 16,
      type: 'WeaponCosmetic',
      nftPrice: 0.4,
      name: 'Diamond Weapon Border',
      description: '',
      image: ''
    },
    {
      id: 17,
      type: 'WeaponCosmetic',
      nftPrice: 0.3,
      name: 'Gold Weapon Border',
      description: '',
      image: ''
    },
    {
      id: 18,
      type: 'WeaponCosmetic',
      nftPrice: 0.2,
      name: 'Silver Weapon Border',
      description: '',
      image: ''
    },
    {
      id: 19,
      type: 'WeaponCosmetic',
      nftPrice: 0.1,
      name: 'Bronze Weapon Border',
      description: '',
      image: ''
    },
    {
      id: 1,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Grayscale',
      description: '',
      image: ''
    },
    {
      id: 2,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Contrast',
      description: 'Increased contrast',
      image: ''
    },
    {
      id: 3,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Sepia',
      description: '',
      image: ''
    },
    {
      id: 4,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Invert',
      description: 'Inverted colors',
      image: ''
    },
    {
      id: 5,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Blur',
      description: 'Blurred character',
      image: ''
    },
    {
      id: 6,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Fire Glow',
      description: 'Glows with fire power',
      image: ''
    },
    {
      id: 7,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Earth Glow',
      description: 'Glows with earth power',
      image: ''
    },
    {
      id: 8,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Lightning Glow',
      description: 'Glows with lightning power',
      image: ''
    },
    {
      id: 9,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Water Glow',
      description: 'Glows with water power',
      image: ''
    },
    {
      id: 10,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Rainbow Glow',
      description: 'Glows with all elements powers',
      image: ''
    },
    {
      id: 11,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Dark Glow',
      description: 'Glows with the dark',
      image: ''
    },
    {
      id: 12,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Ghost Character',
      description: 'Ghost effect',
      image: ''
    },
    {
      id: 13,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Police Lights',
      description: 'Police lights background',
      image: ''
    },
    {
      id: 14,
      type: 'CharacterCosmetic',
      nftPrice: 0.5,
      name: 'Character Neon Border',
      description: '',
      image: ''
    },
    {
      id: 15,
      type: 'CharacterCosmetic',
      nftPrice: 0.4,
      name: 'Character Diamond Border',
      description: '',
      image: ''
    },
    {
      id: 16,
      type: 'CharacterCosmetic',
      nftPrice: 0.3,
      name: 'Character Gold Border',
      description: '',
      image: ''
    },
    {
      id: 17,
      type: 'CharacterCosmetic',
      nftPrice: 0.2,
      name: 'Character Silver Border',
      description: '',
      image: ''
    },
    {
      id: 18,
      type: 'CharacterCosmetic',
      nftPrice: 0.1,
      name: 'Character Bronze Border',
      description: '',
      image: ''
    }
  ];
}

export function specialOffersNftList(isLandSaleAllowed:boolean = false, landPrice: LandPrice): SkillShopListing[] {
  const nftList = [
    {
      id: 'placeholder',
      type: 'shield',
      nftPrice: 3,
      name: 'Shield',
      description: 'A Legendary Defender Shield',
      image: ''
    }
  ] as SkillShopListing[];

  if(isLandSaleAllowed) {
    nftList.push({
      id: 't1land',
      type: 't1land',
      nftPrice: +landPrice?.Tier1,
      name: 'Tier 1 Land',
      description: 'A tier 1 land',
      image: '',
    } as SkillShopListing);
    nftList.push({
      id: 't2land',
      type: 't2land',
      nftPrice: +landPrice?.Tier2,
      name: 'Tier 2 Land',
      description: 'A tier 2 land',
      image: '',
    } as SkillShopListing);
    nftList.push({
      id: 't3land',
      type: 't3land',
      nftPrice: +landPrice?.Tier3,
      name: 'Tier 3 Land',
      description: 'A tier 3 land',
      image: '',
    } as SkillShopListing);
  }

  return nftList; 
}