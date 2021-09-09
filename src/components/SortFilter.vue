<template>
    <div class="filter-list pt-2 pb-2 align-items-center">
        <!-- <div class="sort-tab mpb-1">
            <div class="d-flex flex-grow-1">
                <svg v-on:click="showFilters()" class="hidden-desktop-lg show-mobile-sm" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M11 11l5.76-7.38a1 1 0 0 0-.17-1.4A1 1 0 0 0 16 2H2a1 1 0 0 0-.62.22a1 1 0 0 0-.17 1.4L7 11v5.87a1 1 0 0 0 .29.83l2 2a1 1 0 0 0 1.41 0a1 1 0 0 0 .3-.83V11m2 5l5 5l5-5z" fill="#303B52"/></svg>
            </div> 
            <div>
                <select class="select-metro">
                    <option value="stat">Stat</option>
                    <option value="rarity">Rarity</option>
                    <option value="cost">Cost</option>
                    <option value="name">Name</option>
                </select>
            </div>
        </div> -->
        <div class="sort-tab">
            <select class="select-metro">
                <option value="stat">Stat</option>
                <option value="rarity">Rarity</option>
                <option value="cost">Cost</option>
                <option value="name">Name</option>
            </select>
            <input type="text" class="select-metro max" placeholder="Min Price">
            <input type="text" class="select-metro min" placeholder="Max Price">
            <div class="form-check" id="form" style="border-right: 1px solid rgba(255, 255, 255, 0.453); padding-right: 20px;">
                <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                <label class="form-check-label" for="defaultCheck1" style="color: rgba(255, 255, 255, 0.453);font-size: 13px;font-family: Roboto;">Show Sold</label>
            </div>
            <p class="result-text hidden-mobile-sm">1,231 results</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SortFilter',
    methods:{
        showFilters(){
            this.$root.$emit('filter-value', true)
        }
    }
});

</script>

<style scoped>

</style>
