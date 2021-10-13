<template>
  <b-container class="bv-example-row" fluid>
      <b-row class="buy-main">
        <transition name="fadeInUp" mode="out-in">
            <b-col lg='2'  md='3' sm='12' class="market-filters" v-if="!isMobile || (isMobile && filterIsToggled)">
              <market-filter/>
            </b-col>
         </transition>
         <transition name="fadeInUp" mode="out-in">
            <b-col lg='10' md='9' sm='12' class="bdr-line-left item-list ps-container ps-active-y overflow-auto" v-if="!isMobile || (isMobile && !filterIsToggled)">
              <buy-main></buy-main>
            </b-col>
        </transition>
      </b-row>
    </b-container>
</template>

<script lang="ts">
import Vue from 'vue';
import MarketFilter from '../components/marketFilter.vue';
import BuyMain from '../components/BuyMain.vue'

export default Vue.extend({
  name: 'Buy',
  data() {
      return {
          isLoading: false,
          filterIsToggled: false
      }
  },
  components: {
      BuyMain,
      MarketFilter,
  },
  mounted(){
    this.$root.$on('toggle', (bol:boolean) => {
        this.filterIsToggled = bol
    })
  },
  computed:{
    isMobile() {
      if( screen.width <= 600) {
        return true;
      }
      else {
        return false;
      }
    }
  }
});
</script>

<style>
.market-filters {
  border-right: 1px solid rgba(57, 67, 85, 1);
  height: calc(100vh - 150px)  !important;
  overflow-y: auto !important;
  padding-right: 0px !important;
}
</style>
