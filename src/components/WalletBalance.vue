<template>
    <div class="d-flex align-items-center right-nav pb-4 pl-4 bdr-line-left pt-3">
            <div class="csr-pointer d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" 
                viewBox="0 0 24 24"><g fill="none">
                <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" stroke="#F0E2B6" stroke-width="2"/></g></svg>
            </div>
            <div class="csr-pointer" v-if="web3Connected">
                <span ><img src="../assets/apple-touch-icon.png" alt=""></span>
                50.293
            </div>
            <div class="csr-pointer" v-if="web3Connected">
                <span><img src="../assets/binance-coin-logo.png" alt=""></span>
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
// declare let window: any;

import Vue from 'vue';
// import Web3 from 'web3';

export default Vue.extend({
    name : 'WalletBalance',
    created() {
        // this.contractAddress = process.env.VUE_APP_CONTRACT_ADDRESS;
        // this.contractABI = process.env.VUE_APP_CONTRACT_ABI;
    },
    methods: {
        connectWeb3() {
            console.log('connect metamask');
        }
    },
    data: () => {
        return {
            web3Connected : false
        }
    },
    // mounted() {},
})
</script>