<template>
    <div>
        <div class="csr-pointer">
        <span v-if="web3Connected">
            <span><img src="../assets/apple-touch-icon.png" alt=""></span>
            50.293
        </span>
        
        <!-- <span class="balance"
        v-tooltip="{ content: totalSkillTooltipHtml , trigger: (isMobile() ? 'click' : 'hover') }"
        @mouseover="hover = !isMobile() || true"
        @mouseleave="hover = !isMobile()"
      >{{ formattedTotalSkillBalance }} <b-icon-gift-fill scale="1" v-if="hasInGameSkill" variant="success"/>
      </span> -->
    </div>
    <div class="csr-pointer" v-if="web3Connected">
        <span ><img src="../assets/binance-coin-logo.png" alt=""></span>
        50.293
    </div>
    <div class="csr-pointer flex-grow-1">
        <div class="hex-id">
            <span
              outlined
              class="primary lighten-5" 
              text
              v-on:click="connectWeb3"
              v-if="!web3Connected"
            >
              Connect Wallet
        </span>
        <span v-else> 0X2B..61cB </span>
        </div>
    </div>
    </div>
</template>

<script lang="ts">
declare let window: any;

import Vue from 'vue';
import Web3 from 'web3';

export default Vue.extend({
    name : 'WalletBalance',
    created() {
        // this.contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
        // this.contractABI = process.env.VUE_APP_CONTRACT_ABI;
    },
    methods: {
    },
    // data: () => {},
    // mounted() {},
})
</script>