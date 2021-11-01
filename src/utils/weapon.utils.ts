import { getElementNumberToName } from "@/default/element.default";
import { IWeapon } from "@/interface/weapon.inteface";
import { 
    getStat1Trait, 
    getStat2Trait, 
    getStat3Trait, 
    getStatPatternFromProperties, 
    getWeaponTraitFromProperties,
    statNumberToName
} from "./contract";

export function weaponFromContract(id: string | number, data: string[]): IWeapon {
    const properties = data[0];
    const stat1 = data[1];
    const stat2 = data[2];
    const stat3 = data[3];
    const level = +data[4];
    const blade = data[5];
    const crossguard = data[6];
    const grip = data[7];
    const pommel = data[8];
    const burnPoints = +data[9];
    const bonusPower = +data[10];
  
    const stat1Value = +stat1;
    const stat2Value = +stat2;
    const stat3Value = +stat3;
  
    const statPattern = getStatPatternFromProperties(+properties);
    const stat1Type = getStat1Trait(statPattern);
    const stat2Type = getStat2Trait(statPattern);
    const stat3Type = getStat3Trait(statPattern);
  
    const traitNum = getWeaponTraitFromProperties(+properties);
  
    const lowStarBurnPoints = burnPoints & 0xff;
    const fourStarBurnPoints = (burnPoints >> 8) & 0xff;
    const fiveStarBurnPoints = (burnPoints >> 16) & 0xff;
  
    const stars = (+properties) & 0x7;
    return {
      id: +id, properties,
      element: getElementNumberToName(traitNum),
      stat1: statNumberToName(stat1Type), stat1Value, stat1Type,
      stat2: statNumberToName(stat2Type), stat2Value, stat2Type,
      stat3: statNumberToName(stat3Type), stat3Value, stat3Type,
      level,
      blade, crossguard, grip, pommel,
      stars,
      lowStarBurnPoints,
      fourStarBurnPoints,
      fiveStarBurnPoints,
      bonusPower
    };
  }