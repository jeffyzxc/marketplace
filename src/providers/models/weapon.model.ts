export interface ISearchWeaponListFilter {
    element: string,
    minStars: number,
    maxStars: number,
    sortBy: string,
    sortDir: string,
    minPrice: string,
    maxPrice: string,
    pageSize: number,
    pageNum: number,
}

export interface ISearchWeaponListResult {
    buyerAddress: string,
    charElement: string,
    charId: string,
    charLevel: number,
    network: string,
    price: number,
    sellerAddress: string,
    timestamp: number

}

export interface ISearchWeaponListResponse {
    idResults: Map<number, string>,
    page: {
        curOffset: number,
        curPage: number,
        numPages: number,
        pageSize: number,
    },
    results: Map<number, ISearchWeaponListResult>
}