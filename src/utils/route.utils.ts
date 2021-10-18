import { getElementNameByValue } from "@/default/element.default";
import { getRarityNameByValue } from "@/default/rarity.default";
import { IMarketFilter } from "@/interface/filters.interface";
import { Dictionary } from "vue-router/types/router";
import { Capatitalize } from "./string.util";

export function isPathMatch(a:string, b:string) : boolean {
    return a === b;
}

export function queryParamsToMarketFilter(dict:Dictionary<string | (string | null)[] | null | undefined>, replaceEmptyWithDefault: IMarketFilter = { elementFilter: [], rarityFilter: [], maxPrice: Number.MAX_SAFE_INTEGER, minPrice: 0 }): IMarketFilter {
    const marketFilter: IMarketFilter = {
        elementFilter: replaceEmptyWithDefault.elementFilter,
        rarityFilter: replaceEmptyWithDefault.rarityFilter,
        maxPrice: replaceEmptyWithDefault.maxPrice,
        minPrice: replaceEmptyWithDefault.minPrice
    };

    if(dict["element"]) {
        marketFilter.elementFilter = [({name: getElementNameByValue(dict["element"] as string), value: dict["element"] as string || ""})];
    }
    
    if(dict["minStar"]) {
        marketFilter.rarityFilter = [({name: getRarityNameByValue(+dict["minStar"]), value: +dict["minStar"] || 0})];
    }

    if(dict["maxPrice"]) {
        marketFilter.maxPrice = +dict["maxPrice"];
    }

    if(dict["minStar"]) {
        marketFilter.minPrice = +dict["minStar"];
    }

    return marketFilter;
}

export function objToQueryParams(obj: any) : string {
    let query = "";
    
    let isFirstParam = true;
    for (const [key, value] of Object.entries(obj)) {
        if(value && key) {
            if(isFirstParam) {
                query += `${key}=${value}`;
                isFirstParam = false;
            }
            else {
                query += `&${key}=${value}`;
            }
        }
    }

    return query;
}

//@TODO fix this once endpoint request is done
export function marketFilterToQueryDict(filter: IMarketFilter) : Dictionary<string | (string | null)[] | null | undefined> {
    const queryDict:Dictionary<string | (string | null)[] | null | undefined> = {};

    filter.elementFilter.some((res) => {
        queryDict["element"] = Capatitalize(res.value);
    });

    filter.rarityFilter.some((res) => { 
        queryDict["minStar"] = res.value.toString();
    });

    return queryDict;
}