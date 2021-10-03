<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <weapon-item v-for="weapon in allWeapons" :key="'wl'+weapon._id" :weapon="weapon">
            <!-- <weapon-item v-for="weapon in allWeapons" :key="'wl'+weapon.id" :weapon="weapon"> -->
            </weapon-item>
            <div v-if="!allWeapons.length > 0">
                <h2>No Weapons Found...</h2>
            </div>
        </div>

        <div class="d-flex justify-content-center">

            {{ getWeaponListPagination.currentPage }}
            <pagination 
                :current-page.sync="getWeaponListPagination.currentPage"
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
import  { mapActions , mapGetters , mapState } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';
import Pagination from './../components/dumb/crypblades-pagination.vue';

export default Vue.extend({
    components: { 
       'pagination': Pagination ,
        WeaponItem
    },
    //passing the filters on props for now...
    data() {
        return {
            filterIsToggled: {}
        }
    },

    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    store : store,
    methods: {
    ...mapActions(['fetchWeaponsList']),
        onCurrentPageChange: (page: number) => {
           if(page) {
              store.commit('setWeaponListCurrentPage', page);
              store.dispatch('fetchWeaponsList');
           }
        }
    },
    watch: {
        getWeaponListPagination: (e) => {
            console.log(e);
        }
    },
    computed: mapGetters(['allWeapons', 'getWeaponListPagination']),
    created() {
        this.$root.$on('filter-value', (data: IMarketFilter) => {
            this.filterIsToggled = data;

            store.commit({
                type: 'setWeaponListFilter',
                filter: this.filterIsToggled
            });

            this.fetchWeaponsList();
        });
    }
});
</script>
<style scoped>

</style>