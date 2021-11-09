
import { ICharacter } from '@/interface/character';
import img1 from './../assets/characters/chara-0.png';
import img2 from './../assets/characters/chara-1.png';
import img3 from './../assets/characters/chara-2.png';
import img4 from './../assets/characters/chara-3.png';

const allImages = [img1, img2, img3, img4];

export function getCharacterArt(character: ICharacter) {
  if (!character) {
    return null;
  }

  return allImages[character.id % allImages.length];
}
