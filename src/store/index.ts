import { IMarketFilter } from '@/interface/filters.interface';
import { IWeb3Instance } from '@/interface/web3instance.interface';
import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_API_URL } from '../const/environments';
import Web3 from 'web3';
import createKeccakHash from 'keccak';

import {
  marketFilterToQueryDict,
  objToQueryParams
} from '../utils/route.utils';
let web3Instance : IWeb3Instance;

Vue.use(Vuex);

function toChecksumAddress(address: string) {
  address = address.toLowerCase().replace('0x', '')
  const hash = createKeccakHash('keccak256').update(address).digest('hex')
  let ret = '0x'

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      ret += address[i].toUpperCase()
    } else {
      ret += address[i]
    }
  }

  return ret
}


interface IWeapon {
  id:            string;
  price:         number;
  weaponID:      string;
  weaponStars:   number;
  weaponElement: string;
  stat1Element:  string;
  stat1Value:    number;
  stat2Element:  string;
  stat2Value:    number;
  stat3Element:  string;
  stat3Value:    number;
  timestamp:     number;
  sellerAddress: string;
  buyerAddress:  null;
  network:       string;
}
export interface IState {
  defaultAccount: string,
  currentWalletAddress : string,
  currenSkillBalance: number,
  currentBNBBalance  : number,
  chainId: string,
  metamaskConnected: boolean,
  weaponsList : any,
  weaponListFilter: IMarketFilter
}


export const store = new Vuex.Store<IState>({
  state: {
    defaultAccount: '',
    chainId: '',
    currentWalletAddress: '',
    currentBNBBalance : 0,
    currenSkillBalance : 0,
    metamaskConnected: false,
    weaponsList : [],
    weaponListFilter: {
      elementFilter: [],
      rarityFilter: []
    }
  },
  mutations: {
    setWeaponListFilter(state, payload) {
      state.weaponListFilter = payload.filter;
    },
    setCurrenSkillBalance(state, payload) {
      state.currenSkillBalance = payload
    }, 
    setCurrentBNBBalance(state, payload) {
      state.currentBNBBalance = payload
    }, 
    setCurrentWalletAddress (state, payload) {
      state.currentWalletAddress = payload
    },
    setDefaultAaccount (state, payload) {
      state.defaultAccount = payload
    },
    setChainId (state, payload) {
      state.chainId = payload
    },
    setMetamaskConnected (state, payload) {
        state.metamaskConnected = payload;
    },
    setWeaponsList: (state, weapons) => (state.weaponsList = weapons),
    getWeaponsList: function(state, payload) {
      state.weaponsList = payload
    },
    clearWeaponListFilter(state) {
      state.weaponListFilter = {
        elementFilter: [],
        rarityFilter: []
      };
    }
 },
  actions: {
    async getMetamaskProvider() {
      // check window ethereum provider
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum)
        try {
          await window.ethereum.enable()
          web3Instance = web3
        } catch(error) {
          console.log('error',error);
        }
        console.log('------------- web3 instance -------------------');
        console.log(web3Instance);
      } else {
       console.log('Please install Metamask');
      }
    },
    async getMetamaskInformation({ dispatch }) {
      // step 1: check window ethereum provider
      await dispatch('getMetamaskProvider')
      if (!web3Instance) {
        console.error('please install metamask');
        return
      }
  
      // step 2: get account
      await dispatch('getMetamaskAccount')
    },
    async fetchWeaponsList({ commit }) {
      try {
          const response = await fetch(`${BASE_API_URL}/static/market/weapon${objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter))}`);
          const data = await response.json();

          commit('setWeaponsList', data.results);
      } catch (error) {
          console.error(error);
      }
    },
    async getMetamaskAccount({ commit, dispatch }) {
      const web3 = new Web3(window.ethereum);
      web3Instance = web3;
      await web3Instance.eth.getAccounts()
        .then(async accounts => {
          if (accounts.length > 0) {
            await dispatch('getAccountBalance', accounts[0])
            // 'Success to connect account'
          } else {
            // Failed to connect account'
          }
        })
        .catch((error: string) => {
          throw error
        })
    },
    async getAccountBalance({ commit }, account) {
      await web3Instance.eth.getBalance(toChecksumAddress(account))
        .then((balance: number) => {
          commit('setCurrentBNBBalance', Math.round(balance / (Math.pow(10, 18)) * 100) / 100);
          console.log(Math.round(balance / (Math.pow(10, 18)) * 100) / 100);
        })
        .catch((error: string) => {
          throw error
        })
    },
  },
  modules: {
  },
  getters : {
      getMetamaskConnected : state => state.metamaskConnected,
      defaultAccount : state => state.defaultAccount,
      currentWalletAddress : state => state.currentWalletAddress,
      currentBNBBalance : state => state.currentBNBBalance,
      allWeapons: (state) => state.weaponsList,
  }
})
