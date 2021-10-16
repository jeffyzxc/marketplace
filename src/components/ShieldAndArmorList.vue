<template>
	<div>
        <div class="spacer flex-wrap mb-5 mt-5 d-flex" v-if="getFetchShieldAndArmorListLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>

		<div class="spacer flex-wrap d-flex">
			<shield-item
				v-for="(shield, index) in allShields"
				:key="'shield' + index"
				:shield="shield"
			>
			</shield-item>

            <div v-if="!allShields.length > 0" class="mb-5 mt-5">
                <h2>No Shield Found...</h2>
            </div>
		</div>

		<div class="d-flex justify-content-center" v-if="!getFetchShieldAndArmorListLoadingState && !isFirstLoad">
            <pagination 
                :page="getShieldAndArmorListPagination.currentPage"
                :total-rows="getShieldAndArmorListPagination.totalItems"
                :per-page="getShieldAndArmorListPagination.pageSize"
                
                v-on:changes="onCurrentPageChange($event)"
            >
            </pagination>
        </div>

	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import ShieldItem from './ShieldItem.vue'
import { store } from '../store/index';
import { mapActions, mapGetters } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';
import Pagination from './../components/dumb/crypblades-pagination.vue';
import Spinner from './../components/dumb/crypbolades-spinner.vue';
import { Dictionary } from 'vue-router/types/router';

export default Vue.extend({
	components: { 
	   'pagination': Pagination ,
       'spinner': Spinner,
	   'shield-item': ShieldItem 
	},
	//passing the filters on props for now...
	// sellStatus --> 0 = Not Listed, 1 = Listed (Active), 2 - Listed (Sold)
	props: ['rarity', 'element', 'stat', 'reforge'],
	data() {
        return {
            isFirstLoad: true
        }
	},
 	created() {       
		const snapshotQuery = this.$route.query;
        const pageQuery = snapshotQuery['page']

        if(pageQuery)
            store.commit('setShieldAndArmorListCurrentPage',  +pageQuery);
        
        this.fetchShieldsList();

        this.$root.$on('filter-value', this.filterValueHandler);
        this.isFirstLoad = false;
	},
	destroyed() {
		this.$root.$off('filter-value', this.filterValueHandler);
        store.commit('setShieldAndArmorListCurrentPage', 1);
	},
    computed: mapGetters(['allShields', 'getFetchShieldAndArmorListLoadingState', 'getShieldAndArmorListPagination']),
	methods: {
		...mapActions(['fetchShieldsList']),
		onCurrentPageChange(page: number) {
            if(page) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                
                this.$router.replace({name: "Buy", params: this.$route.params, query: {...snapshotQuery, page: page.toString()} });
                
                store.commit('setShieldAndArmorListCurrentPage', page);
                this.fetchShieldsList();
            }
        },
		filterValueHandler(data: IMarketFilter, resetToPage: boolean) {
            if(resetToPage) {
                store.commit('setShieldAndArmorListCurrentPage', 1);
            }

            store.commit({
                type: 'setWeaponListFilter',
                filter: data
            });

            this.fetchShieldsList();
		}
	},
	
})
</script>
<style scoped></style>
