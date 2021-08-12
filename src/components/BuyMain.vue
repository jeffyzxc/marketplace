<template>
    <div class="w-100" style="height: calc(100vh - 100px);">
        <div class="banner-ads pt-4">
            <div class="bg-banner"></div>
        </div>
        <div>
            <sort-filter />
        </div>
        <div class="list-items">
            <div class="spacer flex-wrap d-flex append-weapon">
                <weapon-list>
                </weapon-list>
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