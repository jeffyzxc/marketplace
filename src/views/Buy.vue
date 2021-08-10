<template>
  <b-container class="bv-example-row" fluid>
      <b-row class="buy-main">
        <b-col cols="2" class="market-filters"><market-filter/></b-col>
        <b-col cols="10" class="bdr-line-left pr-5 item-list ps-container ps-active-y">
          <div class="banner-ads pt-4">
            <div class="bg-banner"></div>
          </div>
          <div>
            <sort-filter />
          </div>
           <div class="list-items">
                <div class="spacer flex-wrap d-flex append-weapon">
                  <weapon-item/>
                </div>
            </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import MarketFilter from '../components/marketFilter.vue';
import SortFilter from '../components/SortFilter.vue';
import WeaponItem from '../components/WeaponItem.vue';
export default Vue.extend({
  name: 'Buy',
  components: {
        MarketFilter,
        SortFilter,
        WeaponItem
    }
});
</script>

<style>
.buy-main {
  height:100%;
}
.market-filters {
  border-right: 1px solid rgba(57, 67, 85, 1);
}
</style>
