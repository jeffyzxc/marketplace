export interface IWeaponListRequest {
    pageSize?: number,
    element?: string,
    minStars?: number,
    maxStars?: number
}

export interface IWeapon {
  id:            string;
  price:         number;
  weaponId:      string;
  weaponStars:   number;
  weaponElement: string;
  stat1Element:  string;
  stat1Value:    number;
  stat2Element:  string;
  stat2Value:    number;
  stat3Element:  string;
  stat3Value:    number;
  timestamp:     number;
  sellerAddress: string;
  buyerAddress:  null;
  network:       string;
}