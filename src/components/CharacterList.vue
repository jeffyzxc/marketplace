<template>
    <div>
        <div class="spacer flex-wrap mb-5 mt-5 d-flex"  v-if="getFetchCharacterlistLoadingState">
            <spinner class="m-5"> 
            </spinner>
        </div>

        <div class="spacer flex-wrap mb-5 mt-5 d-flex" v-if="!getFetchCharacterlistLoadingState">
            <character-item v-for="(cl,index) in allCharacters" :key="'cl'+index" :character="cl">
            </character-item>

            <div v-if="!allCharacters.length > 0" class="mb-5 mt-5">
                <h2>No Characters Found...</h2>
            </div>
        </div>

        <div class="d-flex justify-content-center">
            <pagination 
                v-on:changes="onCurrentPageChange($event)"

                :current-page.sync="getCharacterListPagination.currentPage"
                :total-rows="getCharacterListPagination.totalItems"
                :per-page="getCharacterListPagination.pageSize"
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

export default Vue.extend({
    components: { 
       'pagination': Pagination ,
       'spinner': Spinner,
        CharacterItem 
    },
    name: 'SortFilter',
    store : store,
    methods:{
        ...mapActions(['fetchCharacterList']),
        onCurrentPageChange: function(page:number) {
            if(page >= 0) {
                store.commit('setCharacterListCurrentPage', page);
                store.dispatch('fetchCharacterList');
            }
        }
    },
    created() {
        this.fetchCharacterList();

        store.commit('setCharacterListCurrentPage', 1);
    },
    computed: mapGetters(['allCharacters', 'getCharacterListPagination', 'getFetchCharacterlistLoadingState']),
});
</script>
<style scoped>

</style>