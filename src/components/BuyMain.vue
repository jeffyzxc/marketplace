<template>
 <div class="w-100" style="height: calc(100vh - 100px);">
    <div class="banner-ads pt-4 hidden-mobile-sm">
        <div class="bg-banner"></div>
        </div>
        <div>
        <sort-filter />
        </div>
        <div class="list-items">

            <!----- LOADER--- -->
            <div class="spacer flex-wrap d-flex append-weapon justify-content-center alig-items-center"  v-if="isLoading">
                <div class="spinner-border" style="width: 3rem; height: 3rem;color:#ffffff4a" role="status">
                <span class="sr-only"></span>
                </div>
            </div>

            <!-- LIST WEAPON -->
            <div class="spacer flex-wrap d-flex append-weapon" v-else>
                <weapon-list/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import WeaponList from '../components/WeaponList.vue';
import SortFilter from '../components/SortFilter.vue'
export default Vue.extend({
    components:{
        SortFilter,
        WeaponList
    }
})
</script>