<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <weapon-item v-for="(wl,index) in weaponList" :key="'wl'+index">

            </weapon-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import WeaponItem from './WeaponItem.vue';

export default Vue.extend({
  components: { WeaponItem },
    //passing the filters on props for now...
    props: ['rarity','element','stat','reforge'],
    name: 'SortFilter',
    data (){
        return {
            weaponList:[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        }
    },
    methods:{
        fetchWeapons(){
            return;
        }
    }
});
</script>
<style scoped>

</style>