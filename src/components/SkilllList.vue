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
import { LandPrice, SkillShopListing } from '@/interface/shop.inteface';
import { mapActions } from 'vuex';
import { fromWeiEther } from '@/utils/common';
export default Vue.extend({
    components: { 
      SkillItem
    },
    name: 'SortFilter',
    data() {
        let skillList: Array<SkillShopListing> = [];

        return {
            skillList: skillList
        }
    },
    async mounted() {
        const isLandSaleAllowed = await this.fetchIsLandSaleAllowed();
        
        const t1LandPrice = fromWeiEther(await this.getCBKLandPrice({tier: 1}));
        const t2LandPrice = fromWeiEther(await this.getCBKLandPrice({tier: 2}));
        const t3LandPrice = fromWeiEther(await this.getCBKLandPrice({tier: 3}));

        this.skillList.push(
            ...specialOffersNftList(isLandSaleAllowed, {
                Tier1: +t1LandPrice,
                Tier2: +t2LandPrice,
                Tier3: +t3LandPrice
            } as LandPrice)
        );

        this.skillList.push(
            ...nftList()
        );

    },
    methods:{
        ...mapActions(['fetchIsLandSaleAllowed', 'getCBKLandPrice'])
    }
});
</script>
<style scoped>

</style>