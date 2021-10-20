<template>
    <div>
        <div class="spacer flex-wrap mb-5 mt-5 d-flex"  v-if="getFetchCharacterlistLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>

        <div class="spacer flex-wrap mb-5 mt-5 d-flex">
            <character-item v-for="(cl,index) in allCharacters" :key="'cl'+index" :character="cl">
            </character-item>

            <div v-if="!allCharacters.length > 0" class="mb-5 mt-5">
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
import { mapActions, mapGetters } from 'vuex';
import CharacterItem from './CharacterItem.vue';
import Pagination from './../components/dumb/crypblades-pagination.vue';
import Spinner from './../components/dumb/crypbolades-spinner.vue';
import { IMarketFilter } from '@/interface/filters.interface';
import { Dictionary } from 'vue-router/types/router';

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
    ...mapActions(['fetchCharacterList']),
        onCurrentPageChange(page: number) {
            if(page) {
                let snapshotQuery = this.$route.query as Dictionary<string>;
                
                this.$router.replace({name: "Buy", params: this.$route.params, query: {...snapshotQuery, page: page.toString()} });
                
                store.commit('setCharacterListCurrentPage', page);
                console.log(this.getCharacterListPagination);
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
        }
    },
    computed: mapGetters(['allCharacters', 'getCharacterListPagination', 'getFetchCharacterlistLoadingState']),
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