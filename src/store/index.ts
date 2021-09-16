import { IMarketFilter } from '@/interface/filters.interface';
import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_API_URL } from '../const/environments';

import {
  marketFilterToQueryDict,
  objToQueryParams
} from '../utils/route.utils';

Vue.use(Vuex)

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
interface IShield {
  id:             string;
  shieldId:       string;
  shieldStars:    number;
  shieldElement:  string;
  stat1Element:   string;
  stat2Element:   string;
  stat3Element:   string;
  stat1Value:     number;
  stat2Value:     number;
  stat3Value:     number;
  price:          number;
  timestamp:      number;
  sellerAddress:  string;
  network:        string;
}
export interface IState {
  defaultAccount: string,
  currentWalletAddress : string,
  chainId: string,
  metamaskConnected: boolean,
  weaponsList : any,
  weaponListFilter: IMarketFilter,
  shieldListFilter: IMarketFilter,
  shieldList: Array<IShield>
}


export const store = new Vuex.Store<IState>({
  state: {
    defaultAccount: '',
    chainId: '',
    currentWalletAddress: '',
    metamaskConnected: false,
    weaponsList : [],
    weaponListFilter: {
      elementFilter: [],
      rarityFilter: []
    },
    shieldListFilter: {
      elementFilter: [],
      rarityFilter: []
    },
    shieldList: []
  },
  mutations: {
    setShieldListFilter(state, payload) {
      state.shieldListFilter = payload.filter;
    },
    setWeaponListFilter(state, payload) {
      state.weaponListFilter = payload.filter;
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
    setShieldsList: (state, shieldList) => (state.shieldList = shieldList),
    setWeaponsList: (state, weapons) => (state.weaponsList = weapons),
    getShieldsList: function(state, payload) {
      state.shieldList = payload
    },
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
    async fetchWeaponsList({ commit }) {
      try {
          const response = await fetch(`${BASE_API_URL}/static/market/weapon${objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter))}`);
          const data = await response.json();

          commit('setWeaponsList', data.results);
      } catch (error) {
          console.error(error);
      }
    },
    async fetchShieldsList({commit}){
      try {
          const response = await fetch(`${BASE_API_URL}/static/market/shield${objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter))}`);
          
          const data = await response.json();
          console.log(data.results)
          commit('setShieldsList', data.results);
      } catch (error) {
          console.error(error);
      }
      
    }
  },
  modules: {
  },
  getters : {
      getMetamaskConnected : state => state.metamaskConnected,
      defaultAccount : state => state.defaultAccount,
      currentWalletAddress : state => state.currentWalletAddress,
      allWeapons: (state) => state.weaponsList,
      allShields: (state) => state.shieldList,
  }
})
