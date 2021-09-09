<template>
    <div class="w-100 pl-4 pr-4" style="height: calc(100vh - 100px);">
        <div class="banner-ads pt-4">
            <!----- BANNER--- -->
            <div class="bg-banner-left"></div> 
            <div class="bg-banner-right"></div> <!----- Hidden in Mobile--- -->
        </div>
        <div class="filtered">
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
                     <transition name="fadeInUp" mode="out-in">
                        <component v-bind:is="items" />
                    </transition>
                    <!-- <weapon-list/> -->
                </div>
            </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import CharacterList from '../components/CharacterList.vue';
import WeaponList from '../components/WeaponList.vue';
import SkillList from '../components/SkilllList.vue';
import SortFilter from '../components/SortFilter.vue'
export default Vue.extend({
    components:{
        SortFilter,
        'weapon-list': WeaponList,
        'skill-list': SkillList,
        'character-list': CharacterList
    },
    data(){
      return{
          items: 'weapon-list',
          filterIsToggled: false,
          isLoading: false,
          weaponsList : []
      }
    },
    mounted(){  
        this.$root.$on('refresh-list', (itemType:string) => {
            if(itemType == 'character'){
                this.items = 'character-list'
            }else if(itemType == 'weapon'){
                this.items = 'weapon-list'
            }else if(itemType == 'skillshop'){
                this.items = 'skill-list'
            }
        });
    }
})
</script>