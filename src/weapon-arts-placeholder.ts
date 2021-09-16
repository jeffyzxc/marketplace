import img1 from './assets/weapons/weapon2.png';
import img2 from './assets/weapons/weapon2.png';
import img3 from './assets/weapons/weapon3.png';
import img4 from './assets/weapons/weapon4.png';
import img5 from './assets/weapons/weapon5.png';
import img6 from './assets/weapons/weapon6.png';
import img7 from './assets/weapons/weapon7.png';


import { IWeapon } from './interface/weapon.inteface';

const allImages = [img1, img2, img3, img4, img5, img6, img7];

export function getWeaponArt(weapon: IWeapon) {
  if (!weapon) {
    return null;
  }

  return allImages[parseInt(weapon.weaponId) % allImages.length];
}