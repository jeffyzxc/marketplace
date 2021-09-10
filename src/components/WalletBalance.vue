<template>
    <div class="d-flex align-items-center right-nav pb-4 pl-4 bdr-line-left pt-3">
            <div class="csr-pointer d-flex">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" 
                viewBox="0 0 24 24"><g fill="none">
                <path d="M12 8v4m0 0v4m0-4h4m-4 0H8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="12" r="10" stroke="#F0E2B6" stroke-width="2"/></g></svg>
            </div>
            <div class="csr-pointer" v-if="getMetamaskConnected">
                <span ><img src="../assets/apple-touch-icon.png" alt=""></span>
                {{currenSkillBalance || '0.00' }}
            </div>
            <div class="csr-pointer" v-if="getMetamaskConnected">
                <span><img src="../assets/binance-coin-logo.png" alt=""></span>
                {{currentBNBBalance || '0.00' }}
            </div>
            <div class="csr-pointer flex-grow-1">
                <div class="hex-id">
                        <span
                        outlined
                        class="primary lighten-5" 
                        text
                        @click="connectMetamask()"
                        v-if="!getMetamaskConnected"
                        >
                        Connect Wallet
                    </span>
                    <span v-else> {{currentWalletAddress.substring(1, 4)}}...{{currentWalletAddress.substr(currentWalletAddress.length - 4)}} </span>
        </div>
            </div>
        </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { store } from '@/store'
import detectEthereumProvider from '@metamask/detect-provider'
import { mapGetters } from 'vuex'



// move this out
interface ConnectInfo {
  chainId: string;
}

export default Vue.extend({
    name : 'WalletBalance',
    props: {
    msg: String,
  },
  data() {
      return { 
          metamaskConnected : false,
    }
  },
  mounted () {
    if (!this.isConnected()) {
        this.onSetupMetamask();
    }
    this.getBNBBalanceSimple();
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'getMetamaskConnected',
      'defaultAccount',
      'currentWalletAddress',
      'currentBNBBalance',
      'currenSkillBalance'
    ])
  },
  methods: {
    getBNBBalanceSimple : async() => {
      await store.dispatch('getMetamaskProvider');
      await store.dispatch('getMetamaskAccount');
    },
    connectMetamask: async () => {
      try {
        const provider = await detectEthereumProvider() as any
        if (provider) {
          console.log('Ethereum successfully detected!')
          const accounts = await provider.request({ method: 'eth_requestAccounts' }) // use for request metamask account
          console.log(accounts)
          if (accounts.length > 0) {
            // get account in array
            // account connect success fully will get array more then 1
            // store account to state
            store.commit('setDefaultAaccount', accounts[0])
            store.commit('setMetamaskConnected', true);
          }
        }
      } catch (err) {
        console.error('Connect metamask fail:', err)
      }
    },
    isConnected : async () => {
        const provider = await detectEthereumProvider() as any;
        console.log('provider', provider);
        if (provider.selectedAddress) {
            store.commit('setMetamaskConnected', true);
            store.commit('setCurrentWalletAddress', provider.selectedAddress);
            // this.state.currentWalletAddress = provider.selectedAddress;
        }
    },
    onSetupMetamask: async () => {
      const provider = await detectEthereumProvider() as any

      provider.on('connect', (connectInfo: ConnectInfo) => {
        console.log(connectInfo)
        store.commit('setChainId', connectInfo.chainId)
      })

      // watch when user change account
      provider.on('accountsChanged', (accounts: string[]) => {
        // console.log(accounts)
        if (accounts.length > 0) {
          store.commit('setDefaultAaccount', accounts[0]);
        } else {
          return;
        }
      });
      await store.dispatch('getMetamaskProvider');
      await store.dispatch('getMetamaskAccount');
    }
    }
})
</script>