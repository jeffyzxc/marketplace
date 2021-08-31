<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <weapon-item v-for="(weapon) in allWeapons" :key="'wl'+weapon.id" :weapon="weapon">
                
            </weapon-item>
            <div v-if="!allWeapons.length > 0">
                <h2>No Weapons Found...</h2>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import WeaponItem from './WeaponItem.vue';
import { store } from '../store/index';
import  { mapActions , mapGetters , mapState } from 'vuex';
import { IMarketFilter } from '@/interface/filters.interface';

export default Vue.extend({
  components: { WeaponItem },
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
    },
    computed: mapGetters(['allWeapons']),
    created() {
        this.$root.$on('filter-value', (data: IMarketFilter) => {
            this.filterIsToggled = data;

            store.commit({
                type: 'setWeaponListFilter',
                filter: this.filterIsToggled
            });

            this.fetchWeaponsList();
        });

    },
});
</script>
<style scoped>

</style>