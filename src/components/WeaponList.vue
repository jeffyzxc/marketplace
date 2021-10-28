<template>
    <div>

        <div class="spacer flex-wrap mb-5 mt-5 d-flex" v-if="getFetchWeaponlistLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>
        
        <div class="spacer flex-wrap d-flex" v-if="!getFetchWeaponlistLoadingState">
                <weapon-item v-for="weapon in allWeapons" :key="'wl'+weapon._id" :weapon="weapon" >
                </weapon-item>

            <div v-if="!allWeapons.length > 0" class="mb-5 mt-5">
                <h2>No Weapons Found...</h2>
            </div>
        </div>

        <div class="d-flex justify-content-center" v-if="!getFetchWeaponlistLoadingState && !isFirstLoad">
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
import  { mapActions , mapGetters } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';
import Pagination from './../components/dumb/crypblades-pagination.vue';
import Spinner from './../components/dumb/crypbolades-spinner.vue';
import { Dictionary } from 'vue-router/types/router';

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
            isFirstLoad: true
        }
    },
    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    store : store,
    methods: {
    ...mapActions(['fetchWeaponsList']),
        onCurrentPageChange(page: number) {
            if(page) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                
                this.$router.replace({name: "Buy", params: this.$route.params, query: {...snapshotQuery, page: page.toString()} });

                store.commit('setWeaponListCurrentPage', page);
                this.fetchWeaponsList();
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
            
            this.fetchWeaponsList();
        }
    },
    computed: mapGetters(['allWeapons', 'getWeaponListPagination', 'getFetchWeaponlistLoadingState']),
    created() {  
        const snapshotQuery = this.$route.query;
        const pageQuery = snapshotQuery['page'];

        if(pageQuery)
            store.commit('setWeaponListCurrentPage',  +pageQuery);
        
        this.fetchWeaponsList();

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