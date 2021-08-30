import { getWeaponElementNameByValue } from "@/default/element.default";
import { getWeaponRarityNameByValue } from "@/default/rarity.default";
import { IMarketFilter } from "@/interface/filters.interface";
import { Dictionary } from "vue-router/types/router";

export function isPathMatch(a:string, b:string) : boolean {
    return a === b;
}

export function queryParamsToMarketFilter(dict:Dictionary<string | (string | null)[] | null | undefined>, replaceEmptyWithDefault: IMarketFilter = {elementFilter: [], rarityFilter: []}): IMarketFilter {
    const marketFilter: IMarketFilter = {
        elementFilter: [],
        rarityFilter: []
    };

    if(dict["element"]) {
        marketFilter.elementFilter.push({name: getWeaponElementNameByValue(dict["element"] as string), value: dict["element"] as string || ""});
    } else {
        marketFilter.elementFilter = replaceEmptyWithDefault.elementFilter;
    }
    
    if(dict["minStar"]) {
        marketFilter.rarityFilter.push({name: getWeaponRarityNameByValue(+dict["minStar"]), value: +dict["minStar"] || 0});
    } else {
        marketFilter.rarityFilter = replaceEmptyWithDefault.rarityFilter;
    }

    return marketFilter;
}

export function objToQueryParams(obj: any) : string {
    let query = "";
    
    let index = 0;

    for (const [key, value] of Object.entries(obj)) {
        if(index === 0) query += `?${key}=${value}`;
        else  {
            query += `&${key}=${value}`;
        }
        index += 1;
    }

    return query;
}

//@TODO fix this once endpoint request is done
export function marketFilterToQueryDict(filter: IMarketFilter) : Dictionary<string | (string | null)[] | null | undefined> {
    const queryDict:Dictionary<string | (string | null)[] | null | undefined> = {};

    filter.elementFilter.some((res) => {
        queryDict["element"] = res.value;
    });

    filter.rarityFilter.some((res) => {
        queryDict["minStar"] = res.value.toString();
    });

    return queryDict;
}