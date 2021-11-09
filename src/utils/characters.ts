import { getElementNumberToName } from "@/default/element.default";
import { ICharacter } from "@/interface/character";

export function characterFromContract(id: string | number, data: string[]): ICharacter {
    const xp = data[0];
    const level = parseInt(data[1], 10);
    const trait = data[2];
    const traitName = getElementNumberToName(+data[2]);
    const staminaTimestamp = data[3];
    const head = data[4];
    const arms = data[5];
    const torso = data[6];
    const legs = data[7];
    const boots = data[8];
    const race = data[9];
    return { id: +id, xp, level, trait, traitName, staminaTimestamp, head, arms, torso, legs, boots, race };
}