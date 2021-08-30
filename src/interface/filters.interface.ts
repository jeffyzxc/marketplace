export interface IFilter<T> {
    name: string,
    value: T
};

export interface IFilterList<T> extends Array<IFilter<T>> {
}


export interface IMarketFilter {
    elementFilter: IFilterList<string>,
    rarityFilter: IFilterList<number>
}