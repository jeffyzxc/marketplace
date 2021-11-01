export interface IWeaponListRequest {
    pageSize?: number,
    element?: string,
    minStars?: number,
    maxStars?: number
}

export interface IWeapon {
  id: number;
  properties: string;
  element: string;
  stat1: string;
  stat1Value: number;
  stat1Type: number;
  stat2: string;
  stat2Value: number;
  stat2Type: number;
  stat3: string;
  stat3Value: number;
  stat3Type: number;
  level: number;
  blade: string;
  crossguard: string;
  grip: string;
  pommel: string;
  stars: number;
  lowStarBurnPoints: number;
  fourStarBurnPoints: number;
  fiveStarBurnPoints: number;
  bonusPower: number;
}