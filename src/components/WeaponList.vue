<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <weapon-item v-for="(weapon) in allWeapons" :key="'wl'+weapon.id" :weapon="weapon">
                
            </weapon-item>

            <!-- <div
                v-for="(weapon, index) in allWeapons"
                :key="index"
                class="p-4 text-xl text-white bg-indigo-700"
            >
                Weapon {{ weapon.weaponId }}
            </div> -->
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import WeaponItem from './WeaponItem.vue';
import { store } from '../store/index';
import  { mapActions , mapGetters , mapState } from 'vuex';

export default Vue.extend({
  components: { WeaponItem },
    //passing the filters on props for now...
    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    store : store,
    methods: {
    ...mapActions(['fetchWeaponsList']),
    },

    computed: mapGetters(['allWeapons']),
    created() {
        this.fetchWeaponsList()
    },

});
</script>
<style scoped>

</style>