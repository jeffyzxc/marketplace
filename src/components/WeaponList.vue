<template>
    <div>

        <div class="spacer flex-wrap mb-5 mt-5 d-flex" v-if="getFetchWeaponlistLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>
        
        <div class="spacer flex-wrap d-flex" v-if="!getFetchWeaponlistLoadingState">
                <weapon-item v-for="weapon in weapons" :key="'wl'+weapon.id" :weapon="weapon" >
                </weapon-item>

            <div v-if="isWeaponsEmpty()" class="mb-5 mt-5">
                <h2>No Weapons Found...</h2>
            </div>
        </div>
        
        <div class="d-flex justify-content-center" v-if="!getFetchWeaponlistLoadingState && !isFirstLoad && !isWeaponsEmpty()">
            <pagination 
                :page="getWeaponListPagination.currentPage"
                :total-rows="getWeaponListPagination.totalItems"
                :per-page="getWeaponListPagination.pageSize"

                v-on:changes="onCurrentPageChange($event)"
            >
            </pagination>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import WeaponItem from './WeaponItem.vue';
import { store } from '../store/index';
import  { mapActions , mapGetters, mapState } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';
import Pagination from './../components/dumb/crypblades-pagination.vue';
import Spinner from './../components/dumb/crypbolades-spinner.vue';
import { Dictionary } from 'vue-router/types/router';
import { getElementNumberValueByName } from '@/default/element.default';
import { DEFAULT_TARGET_BUYER, NULL_FILTER_VALUE, PAGE_SIZE_LIMIT } from '@/default/common.default';
import { BASE_API_URL } from '@/environment/environments';
import { mergeQueryParams } from '@/utils/query-params';
import { marketFilterToQueryDict, objToQueryParams } from '@/utils/route.utils';
import { market_blockchain as useBlockchain } from './../utils/feature-flags';

const s = Vue.extend({
    components: { 
       'pagination': Pagination ,
       'spinner': Spinner,
        WeaponItem
    },
    //passing the filters on props for now...
    data() {
        return {
            filterIsToggled: {},
            totalWeapons: 0,
            isFirstLoad: true
        }
    },
    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    store : store,
    methods: {
        ...mapActions(
            [
                'fetchWeapons',
                'fetchNumberOfWeaponListings',
                'fetchAllMarketWeaponNftIdsPage',
                'fetchMarketNftTargetBuyer'
            ]
        ),
        async fetchWeaponList() {
            if(useBlockchain) {
                await this.fetchWeaponsThroughChain();
            } else {
                await this.fetchWeaponsThroughAPI();
            }
        },
        async fetchWeaponsThroughChain() {
            store.commit('setFetchWeaponListLoadingState', true);   
            const weaponfilterParams = marketFilterToQueryDict(this.weaponListFilter);
            const filterStar = +weaponfilterParams.minStar !== 0 ? +weaponfilterParams.minStar - 1 : NULL_FILTER_VALUE;

            try {
                const totals = await this.fetchNumberOfWeaponListings({
                        nftContractAddr: this.weaponContractAddress,
                        trait: getElementNumberValueByName(weaponfilterParams.element.toString()),
                        stars: filterStar
                });

                const results = await this.fetchAllMarketWeaponNftIdsPage({
                    nftContractAddr: this.weaponContractAddress,
                    limit: PAGE_SIZE_LIMIT,
                    pageNumber: this.weaponListPagination.currentPage - 1,
                    trait: getElementNumberValueByName(weaponfilterParams.element.toString()),
                    stars: filterStar
                });

                const filteredResults = await this.filterOutTargetBuyers(results);

                store.commit('setWeaponListPagination', {
                    pageSize: PAGE_SIZE_LIMIT,
                    totalItems: totals
                });

                await this.fetchWeapons(filteredResults);

                store.commit('setFetchWeaponListLoadingState', false);
            } catch(e) {
                store.commit('setFetchWeaponListLoadingState', false);
            }
        },  
        async fetchWeaponsThroughAPI() {
            store.commit('setFetchWeaponListLoadingState', true);

            try {
                const paginationFilter = `pageNum=${this.weaponListPagination.currentPage - 1}`
                const weaponfilterParams = objToQueryParams(marketFilterToQueryDict(this.weaponListFilter));
                const marketFilter = objToQueryParams(this.globalBuyMarketFilter);

                const queryParams = mergeQueryParams(weaponfilterParams, paginationFilter, marketFilter);
                const response = await fetch(`${BASE_API_URL}/static/market/weapon${queryParams}`);
                const data = await response.json();
                
                store.commit('setWeaponListPagination', {
                    pageSize: data.page.pageSize,
                    totalItems: data.page.total - 1
                });

                await this.fetchWeapons(data.idResults);

                store.commit('setFetchWeaponListLoadingState', false);
            } catch (error) {
                store.commit('setFetchWeaponListLoadingState', false);
            }
        },
        onCurrentPageChange(page: number) {
            if(page) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                
                this.$router.replace({name: "Buy", params: this.$route.params, query: {...snapshotQuery, page: page.toString()} });

                store.commit('setWeaponListCurrentPage', page);
                this.fetchWeaponList();
            }
        },
        filterValueHandler(data: IMarketFilter, resetToPage: boolean) {
            this.filterIsToggled = data;
            
            if(resetToPage) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                this.$router.replace({name: "Buy", params: this.$route.params, query: { ...snapshotQuery, page:"1"} });
                store.commit('setWeaponListCurrentPage', 1);
            }

            store.commit({
                type: 'setWeaponListFilter',
                filter: this.filterIsToggled
            });
            
            this.fetchWeaponList();
        },
        async lookupNftTargetBuyer(nftId: string) {
            if(!this.weaponContractAddress) return;

            return await this.fetchMarketNftTargetBuyer({
                nftContractAddr: this.weaponContractAddress,
                tokenId: nftId,
            });
        },
        async filterOutTargetBuyers(nftIds: Array<string>) {
            if(!this.weaponContractAddress) return [];
            const results: string[] = [];

            await Promise.all(nftIds.map(async nftId => {
                const targetBuyer = (await this.lookupNftTargetBuyer(nftId))!;
                if(targetBuyer === DEFAULT_TARGET_BUYER || targetBuyer === this.defaultAccount) {
                    results.push(nftId);
                }
            }));

            return results;
        },
        isWeaponsEmpty() {
            return Object.entries(this.weapons).length === 0
        }
    },
    computed: 
    {
        ...mapGetters(
            [
                'weapons',
                'allWeapons', 
                'getWeaponListPagination', 
                'getFetchWeaponlistLoadingState', 
                'contracts',
                'weaponContractAddress',
            ]
        ),
        ...mapState(
                [
                    'defaultAccount',
                    'weaponListPagination',
                    'globalBuyMarketFilter',
                    'weaponListFilter'
                ]
            )
    },
    async created() {  
        const snapshotQuery = this.$route.query;
        const pageQuery = snapshotQuery['page'];

        if(pageQuery)
            store.commit('setWeaponListCurrentPage',  +pageQuery);
        
        this.fetchWeaponList();

        this.$root.$on('filter-value', this.filterValueHandler);
        this.isFirstLoad = false;
    },
    destroyed() {
        this.$root.$off('filter-value', this.filterValueHandler);
        store.commit('setWeaponListCurrentPage', 1);
        store.commit('setGlobalFilter', {});
    }
});

export default s;

</script>
<style scoped>

</style>