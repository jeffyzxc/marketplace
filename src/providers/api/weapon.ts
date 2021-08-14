import { apiUrl } from "@/utils/common";
import { 
  ISearchWeaponListFilter, 
  ISearchWeaponListResponse 
} from "../models/weapon.model";
import { SEARCH_WEAPON_LIST } from "./constants/weapon.api";

export class WeaponProvider {

    async searchAllWeaponListings(filter: ISearchWeaponListFilter) : Promise<ISearchWeaponListResponse> {
        const url = new URL(apiUrl(SEARCH_WEAPON_LIST));
        const params = {
          element: filter.element,
          minStars: filter.minStars.toString(),
          maxStars: filter.maxStars.toString(),
          sortBy: filter.sortBy,
          sortDir: filter.sortDir,
          minPrice: filter.minPrice.toString(),
          maxPrice: filter.maxPrice.toString(),
          pageSize: filter.pageSize.toString(),
          pageNum: filter.pageNum.toString(),
        };
    
        url.search = new URLSearchParams(params).toString();

        const weaponsData = await fetch(url.toString());
        const weapons = await weaponsData.json();   

        return weapons;
    }
}