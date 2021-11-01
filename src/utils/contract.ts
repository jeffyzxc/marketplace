import { WeaponTrait } from "@/default/element.default";

export function getStatPatternFromProperties(properties: number): number {
    return (properties >> 5) & 0x7f;
}

export function getStat1Trait(statPattern: number): number {
    return (statPattern % 5);
}

export function getStat2Trait(statPattern: number): number {
    return (Math.floor(statPattern / 5) % 5);
}

export function getStat3Trait(statPattern: number): number {
    return (Math.floor(Math.floor(statPattern / 5) / 5) % 5);
}

export function getWeaponTraitFromProperties(properties: number): number {
    return (properties >> 3) & 0x3;
}

export function statNumberToName(statNum: number): string {
    switch(statNum) {
        case WeaponTrait.CHA: return 'CHA';
        case WeaponTrait.DEX: return 'DEX';
        case WeaponTrait.INT: return 'INT';
        case WeaponTrait.PWR: return 'PWR';
        case WeaponTrait.STR: return 'STR';
        default:              return '???';
    }
}