<template>
    <div class="filter-list pt-2 pb-2 align-items-center">
        <!-- <div class="sort-tab mpb-1">
            <div class="d-flex flex-grow-1">
                <svg v-on:click="showFilters()" class="hidden-desktop-lg show-mobile-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M11 11l5.76-7.38a1 1 0 0 0-.17-1.4A1 1 0 0 0 16 2H2a1 1 0 0 0-.62.22a1 1 0 0 0-.17 1.4L7 11v5.87a1 1 0 0 0 .29.83l2 2a1 1 0 0 0 1.41 0a1 1 0 0 0 .3-.83V11m2 5l5 5l5-5z" fill="#303B52"/></svg>
            </div> 
            <div>
                <select class="select-metro">
                    <option value="stat">Stat</option>
                    <option value="rarity">Rarity</option>
                    <option value="cost">Cost</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </div> -->
        <div class="sort-tab">
            <select class="select-metro">
                <option value="stat">Stat</option>
                <option value="rarity">Rarity</option>
                <option value="cost">Cost</option>
                <option value="name">Name</option>
            </select>
            
            <input type="number" class="select-metro min" placeholder="Min Price" @change="onChangeMinMaxPrice(minPrice, maxPrice)" v-model="minPrice">
            <input type="number" class="select-metro max" placeholder="Max Price" @change="onChangeMinMaxPrice(minPrice, maxPrice)" v-model="maxPrice">
            <div class="form-check" id="form" style="border-right: 1px solid rgba(255, 255, 255, 0.453); padding-right: 20px;">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1" style="color: rgba(255, 255, 255, 0.453);font-size: 13px;font-family: Roboto;">Show Sold</label>
            </div>
            <p class="result-text hidden-mobile-sm">1,231 results</p>
        </div>
    </div>
</template>

<script lang="ts">
import { BuyPageRouteParamEnum } from '@/utils/buy-page-routes';
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import { store } from '@/store';
import { removeEmptyQueryParams } from '@/utils/query-params';

export default Vue.extend({
    name: 'SortFilter',
    data: function() {
        return {
            minPrice: '',
            maxPrice: '',
            currentTab: ''
        };
    },
    methods: {
        ...mapActions(['fetchShieldsList', 'fetchWeaponsList', 'fetchCharacterList']),
        showFilters(){
            this.$root.$emit('filter-value', true);
        },
        getSafeMinMaxValue(minPrice: string, maxPrice: string) {
            const min = Math.min(minPrice ? +minPrice : 0, maxPrice ? +maxPrice : Number.MAX_SAFE_INTEGER);
            const max = Math.max(minPrice ? +minPrice : Number.MIN_SAFE_INTEGER, maxPrice ? +maxPrice : 0);

            return {
                minPrice: minPrice ? min.toString() : '',
                maxPrice: maxPrice ? max.toString() : '',
            };
        },
        onChangeMinMaxPrice(minPrice: string, maxPrice: string) {
            this.minPrice = minPrice;
            this.maxPrice = maxPrice;

            const safeMinMaxFilter = this.getSafeMinMaxValue(minPrice, maxPrice);

            store.commit('setGlobalFilter', safeMinMaxFilter);
            this.$router.replace({name: "Buy", params: this.$route.params, query: {...removeEmptyQueryParams({ ...this.$route.query, ...safeMinMaxFilter, page: '1'})} });
            
            this.setStatePageFuncMap(this.currentTab);
            this.fetchListFuncMap(this.currentTab);
        },
        tabChangeHandler(tab: string) {
            this.currentTab = tab;
            this.resetInitData();
        },
        fetchListFuncMap(buyPageTabs: string) {
            switch(buyPageTabs) {
                case BuyPageRouteParamEnum["character"] : 
                    this.fetchCharacterList();
                    break;
                case BuyPageRouteParamEnum["weapon"] :
                    this.fetchWeaponsList();
                    break;
                case BuyPageRouteParamEnum["shield"]:
                    this.fetchShieldsList();
                    break;
                default:
                    this.fetchWeaponsList();
                    break;
            }
        },
        setStatePageFuncMap(buyPageTabs: string, page = 1) {
            switch(buyPageTabs) {
                case BuyPageRouteParamEnum["character"] : 
                    store.commit('setCharacterListCurrentPage', page);
                    break;
                case BuyPageRouteParamEnum["weapon"] :
                    store.commit('setWeaponListCurrentPage', page);
                    break;
                case BuyPageRouteParamEnum["shield"]:
                    store.commit('setShieldAndArmorListCurrentPage', page);
                    break;
                default:
                    store.commit('setWeaponListCurrentPage', page);
                    break;
            }
        },
        resetInitData() {
            this.minPrice = '';
            this.maxPrice = '';
        },
        initParamsData() {
            const query = this.$route.query;
            const params = this.$route.params;

            if(query['minPrice'])
                this.minPrice = query['minPrice'] as string;

            if(query['maxPrice'])
                this.maxPrice = query['maxPrice'] as string;

            if(params)
                this.currentTab = params['tabName'];

            const safeMinMaxFilter = this.getSafeMinMaxValue(this.minPrice, this.maxPrice);
            store.commit('setGlobalFilter', safeMinMaxFilter);
        }
    },
    created() {
        this.initParamsData();
    },
    mounted() {
        this.$root.$on('tab-changed', this.tabChangeHandler);
    },
    destroyed() {
        this.$root.$off('tab-changed', this.tabChangeHandler);
    },
    computed:{
        ...mapGetters(['getGlobalFilter'])
    }
});

</script>

<style scoped>

</style>
