<template>
    <div>
        <div class="spacer flex-wrap d-flex">
            <skill-item 
                v-for="(sl,index) in skillList" 
                :key="'sl'+index"
                :skill="sl"
            >
            </skill-item>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue';
import SkillItem from './SkillItem.vue';
import { nftList, specialOffersNftList } from '@/const/nft-shop-list';
import { LandPrice } from '@/interface/shop.inteface';
export default Vue.extend({
    components: { 
      SkillItem
    },
    name: 'SortFilter',
    data (){
        const isLandSaleAllowed = false;

        return {
            skillList: [
                ...specialOffersNftList(isLandSaleAllowed, {} as LandPrice),
                ...nftList(),
            ]
        }
    },
    methods:{
        fetchSkills(){
            return;
        }
    }
});
</script>
<style scoped>

</style>