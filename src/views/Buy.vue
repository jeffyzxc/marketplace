<template>
  <b-container class="bv-example-row" fluid>
      <b-row class="buy-main">
        <b-col cols="2" class="market-filters"><market-filter/></b-col>
        <b-col cols="10">
          <div>
            Banner Section
          </div>
          <div>
            Filter Section
          </div>
          <div>
            Listing all Section
          </div>
        </b-col>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import MarketFilter from '../components/marketFilter.vue'
export default Vue.extend({
  name: 'Buy',
  components: {
        MarketFilter
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
