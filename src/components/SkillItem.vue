<template>
    <div class="item-card">
        <div class="imgs text-center">
            <!-------------- SKILL IMAGE------------>
            <img class="characters" width="120" src="../assets/skill/skill1.png" alt="">
        </div>
        <div class="desc">
            <img width="20" src="../assets/nav-icons/fire.png" alt="">
            <p class="image-name">LIGHTNING POTION</p>
            <p class="battle-power csr-pointer"  id="popover-reactive-1">Misc</p>
            
        </div>
        <div class="lines p-0 m-0">
            <div>.</div>
        </div>
        <div class="cost-item">
            <div>
                <img width="15" src="../assets/apple-touch-icon.png" alt="">
                <span>&nbsp; 0.3</span>
            </div>
            <div>
            </div>
        </div>
        <div class="buttons">
             <p class="btn-purchase right csr-pointer mr-2">Purchase</p>
             <p class="btn-purchase left csr-pointer ml-2" @click="openModal(true)">View</p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    name: 'SortFilter',
    methods:{
        openModal(bol:boolean){
            this.$root.$emit('modal',bol)
        }
    }
});

</script>

<style scoped>

</style>
