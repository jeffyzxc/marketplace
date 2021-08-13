<template>
  <b-container class="bv-example-row" fluid>
      <b-row class="buy-main">
        <transition name="fadeInUp" mode="out-in">
            <b-col lg='2'  md='3' sm='12' class="market-filters" v-if="!isMobile || (isMobile && filterIsToggled)">
                  <market-filter/>
            </b-col>
         </transition>
         <transition name="fadeInUp" mode="out-in">
            <b-col lg='10' md='9' sm='12' class="bdr-line-left item-list ps-container ps-active-y" v-if="!isMobile || (isMobile && !filterIsToggled)">
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
                      <weapon-item/>
                    </div>
                </div>
            </b-col>
        </transition>
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
  data(){
      return{
          filterIsToggled: false,
          isLoading: false
      }
  },
  components: {
      MarketFilter,
      SortFilter,
      WeaponItem
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
  },
  mounted(){
    this.$root.$on('set-toggle', (data:boolean) => {
        this.filterIsToggled = data
    })
  },
  methods:{

  }
});
</script>

<style>
.market-filters {
  border-right: 1px solid rgba(57, 67, 85, 1);
  height: calc(100vh - 150px)  !important;
  overflow-y: auto !important;
}
</style>
