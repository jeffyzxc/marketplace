<template>
    <div>
        <div class="spacer flex-wrap mb-5 mt-5 d-flex"  v-if="getFetchCharacterlistLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>

        <div class="spacer flex-wrap mb-5 mt-5 d-flex">
            <character-item v-for="(cl,index) in characters" :key="'cl'+index" :character="cl">
            </character-item>

            <div v-if="isCharactersEmpty() && !getFetchCharacterlistLoadingState" class="mb-5 mt-5">
                <h2>No Characters Found...</h2>
            </div>
        </div>
        <div class="d-flex justify-content-center"  v-if="!getFetchCharacterlistLoadingState && !isFirstLoad">
            <pagination 
                :page="getCharacterListPagination.currentPage"
                :total-rows="getCharacterListPagination.totalItems"
                :per-page="getCharacterListPagination.pageSize"
                
                v-on:changes="onCurrentPageChange($event)"
            >
            </pagination>
        </div>
    </div>
</template>
<script lang="ts">
import { store } from '../store/index';
import Vue from 'vue';
import { mapActions, mapGetters, mapState } from 'vuex';
import CharacterItem from './CharacterItem.vue';
import Pagination from './../components/dumb/crypblades-pagination.vue';
import Spinner from './../components/dumb/crypbolades-spinner.vue';
import { IMarketFilter } from '@/interface/filters.interface';
import { Dictionary } from 'vue-router/types/router';
import { mergeQueryParams } from '@/utils/query-params';
import { marketFilterToQueryDict, objToQueryParams } from '@/utils/route.utils';
import { BASE_API_URL } from '@/environment/environments';
import { getElementNumberValueByName } from '@/default/element.default';
import { DEFAULT_TARGET_BUYER, PAGE_SIZE_LIMIT } from '@/default/common.default';
import { market_blockchain as useBlockchain } from './../utils/feature-flags';
import { CHARACTER_DEFAULT_MIN_LEVEL_FILTER, CHARACTER_DEFAULT_MAX_LEVEL_FILTER } from './../default/character.default';

export default Vue.extend({
    components: { 
       'pagination': Pagination ,
       'spinner': Spinner,
       'character-item': CharacterItem
    },
    //passing the filters on props for now...
    data() {
        return {
            filterIsToggled: {},
            isFirstLoad: true
        }
    },
    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    store : store,
    methods: {
        ...mapActions(
            [
                'fetchNumberOfCharacterListings',
                'fetchAllMarketCharacterNftIdsPage',
                'fetchMarketNftTargetBuyer',
                'fetchCharacters'
            ]
        ),
        async fetchCharacterList() {
            if(useBlockchain) {
                await this.searchAllCharacterListingsThroughChain();
            } else {
                await this.searchAllCharacterListingsThroughAPI();
            }
        },
        async searchAllCharacterListingsThroughAPI() {
            store.commit('setFetchCharacterListLoadingState', true);

            try {
                const paginationFilter = `pageNum=${this.characterListPagination.currentPage - 1}`
                const characterFilterParams = objToQueryParams(marketFilterToQueryDict(this.characterListFilter));
                const marketFilter = objToQueryParams(this.globalBuyMarketFilter);

                const queryParams = mergeQueryParams(characterFilterParams, paginationFilter, marketFilter);

                const response = await fetch(`${BASE_API_URL}/static/market/character${queryParams}`);
                const data = await response.json();

                store.commit('setCharacterListPagination', {
                    pageSize: data.page.pageSize,
                    totalItems: data.page.total - 1
                });

                await this.fetchCharacters(data.idResults);

                store.commit('setFetchCharacterListLoadingState', false);
            } catch (error) {

                store.commit('setFetchCharacterListLoadingState', false);
            }
        },
        async searchAllCharacterListingsThroughChain() {
            store.commit('setFetchCharacterListLoadingState', true);

            try {
                const weaponfilterParams = marketFilterToQueryDict(this.characterListFilter);
    
                const totals = await this.fetchNumberOfCharacterListings({
                    nftContractAddr: this.characterContractAddress,
                    trait: getElementNumberValueByName(weaponfilterParams.element.toString()),
                    minLevel: CHARACTER_DEFAULT_MIN_LEVEL_FILTER,
                    maxLevel: CHARACTER_DEFAULT_MAX_LEVEL_FILTER
                });

                const results = await this.fetchAllMarketCharacterNftIdsPage({
                    nftContractAddr: this.characterContractAddress,
                    limit: PAGE_SIZE_LIMIT,
                    pageNumber: this.characterListPagination.currentPage - 1,
                    trait: getElementNumberValueByName(weaponfilterParams.element.toString()),
                    minLevel: CHARACTER_DEFAULT_MIN_LEVEL_FILTER,
                    maxLevel: CHARACTER_DEFAULT_MAX_LEVEL_FILTER
                });

                const filteredResults = await this.filterOutTargetBuyers(results);

                store.commit('setCharacterListPagination', {
                    pageSize: PAGE_SIZE_LIMIT,
                    totalItems: totals
                });

                await this.fetchCharacters(filteredResults);

                store.commit('setFetchCharacterListLoadingState', false);
            } catch(e) {
                console.log(e);
                store.commit('setFetchCharacterListLoadingState', false);
            }
        },
        async lookupNftTargetBuyer(nftId: string) {
            if(!this.characterContractAddress) return;

            return await this.fetchMarketNftTargetBuyer({
                nftContractAddr: this.characterContractAddress,
                tokenId: nftId,
            });
        },
        async filterOutTargetBuyers(nftIds: Array<string>) {
            if(!this.characterContractAddress) return [];
            const results: string[] = [];

            await Promise.all(nftIds.map(async nftId => {
                const targetBuyer = (await this.lookupNftTargetBuyer(nftId))!;
                if(targetBuyer === DEFAULT_TARGET_BUYER || targetBuyer === this.defaultAccount) {
                    results.push(nftId);
                }
            }));

            return results;
        },
        onCurrentPageChange(page: number) {
            if(page) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                
                this.$router.replace({name: "Buy", params: this.$route.params, query: {...snapshotQuery, page: page.toString()} });
                
                store.commit('setCharacterListCurrentPage', page);

                this.fetchCharacterList();
            }
        },
        filterValueHandler(data: IMarketFilter, resetToPage: boolean) {
            this.filterIsToggled = data;
            
            if(resetToPage) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                this.$router.replace({name: "Buy", params: this.$route.params, query: { ...snapshotQuery, page:"1"} });
                store.commit('setCharacterListCurrentPage', 1);
            }

            store.commit({
                type: 'setCharacterListFilter',
                filter: this.filterIsToggled
            });

            this.fetchCharacterList();
        },
        isCharactersEmpty() {
            return Object.entries(this.characters).length === 0
        }
    },
    computed: {
        ...mapGetters(
            [
                'characters', 
                'getCharacterListPagination', 
                'getFetchCharacterlistLoadingState',
                'characterContractAddress'
            ]
        ),
        ...mapState(
            [
                'characterListFilter', 
                'characterListPagination',
                'globalBuyMarketFilter',
                'defaultAccount'
            ]
        )
    },
    created() {  
        const snapshotQuery = this.$route.query;
        const pageQuery = snapshotQuery['page'];
        if(pageQuery)
            store.commit('setCharacterListCurrentPage',  +pageQuery);
        
        this.fetchCharacterList();

        this.$root.$on('filter-value', this.filterValueHandler);
        this.isFirstLoad = false;
    },
    destroyed() {
        this.$root.$off('filter-value', this.filterValueHandler);
        store.commit('setCharacterListCurrentPage', 1);
        store.commit('setGlobalFilter', {});
    }
});
</script>
<style scoped>

</style>