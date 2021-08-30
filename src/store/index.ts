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

export interface IState {
  defaultAccount: string,
  chainId: string,
  metamaskConnected: boolean,
  weaponsList : any,
  weaponListFilter: IMarketFilter
}


export const store = new Vuex.Store<IState>({
  state: {
    defaultAccount: '',
    chainId: '',
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
    async fetchWeaponsList({ commit }) {
      try {
          const response = await fetch(`${BASE_API_URL}/static/market/weapon${objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter))}`);
          const data = await response.json();

          commit('setWeaponsList', data.results);
      } catch (error) {
          console.error(error);
      }
  },
  },
  modules: {
  },
  getters : {
      getMetamaskConnected : state => state.metamaskConnected,
      defaultAccount : state => state.defaultAccount,
      allWeapons: (state) => state.weaponsList,
  }
})
