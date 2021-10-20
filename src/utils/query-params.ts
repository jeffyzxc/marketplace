import { Dictionary } from "vue-router/types/router";

export function mergeQueryParams(...args: string[]) : string {
    let queryParams = "";
    let isFirstParams = true;

    for (let i = 0; i < args.length; i++) {
        const el = args[i];

        if(el) {
            if(isFirstParams) {
                queryParams += `?${el}`
                isFirstParams = false;
            } else {
                queryParams += `&${el}`
            }
        }
    }
    
    return queryParams;
}

export function removeEmptyQueryParams(queryParams: Dictionary<string | (string | null)[]>) {
    const filteredQueryParams:Dictionary<string | (string | null)[]> = {};

    for (const key in queryParams) {
        if (Object.prototype.hasOwnProperty.call(queryParams, key)) {
            const element = queryParams[key];
            
            if(element) {
                filteredQueryParams[key] = element;
            }
        }
    }

    return filteredQueryParams;
}