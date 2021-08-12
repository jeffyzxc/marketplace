<template>
  <b-container class="bv-example-row" fluid>
      <b-row class="buy-main">
        <b-col cols="2" class="market-filters"><market-filter></market-filter></b-col>
        <b-col cols="10" class="bdr-line-left pr-5 item-list overflow-auto">
          <buy-main></buy-main>
        </b-col>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import MarketFilter from '../components/MarketFilter.vue';
import BuyMain from '../components/BuyMain.vue'
export default Vue.extend({
  name: 'Buy',
  components: {
        BuyMain,
        MarketFilter,
    }
});
</script>

<style>
.market-filters {
  border-right: 1px solid rgba(57, 67, 85, 1);
}
</style>
