export enum BuyPageRouteParamEnum {
    'character' = 'character',
    'weapon' = 'weapon',
    'skills' = 'skillshop',
    'shield' = 'shield',
    'others' = 'others'
}

export function BuyTabsRouteMap(buyPageTabs: string) : string {
    switch(buyPageTabs) {
        case BuyPageRouteParamEnum["character"] : 
            return BuyPageRouteParamEnum.character
        case BuyPageRouteParamEnum["weapon"] :
            return BuyPageRouteParamEnum.weapon;
        case BuyPageRouteParamEnum["skills"]:
            return BuyPageRouteParamEnum.skills;
        case BuyPageRouteParamEnum["shield"]:
            return BuyPageRouteParamEnum.shield;
        case BuyPageRouteParamEnum["others"]:
            return BuyPageRouteParamEnum.others;
        default:
            return BuyPageRouteParamEnum.weapon;
    }
}