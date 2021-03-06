
import img1 from './../assets/characters/chara-0.png';
import img2 from './../assets/characters/chara-1.png';
import img3 from './../assets/characters/chara-2.png';
import img4 from './../assets/characters/chara-3.png';

const allImages = [img1, img2, img3, img4];

export function getCharacterArt(id: number) {
  if (!id) {
    return null;
  }

  return allImages[id % allImages.length];
}
