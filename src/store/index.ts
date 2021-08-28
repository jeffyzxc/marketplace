import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_API_URL } from '../const/environments';
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

export const store = new Vuex.Store({
  state: {
    defaultAccount: '',
    chainId: '',
    metamaskConnected: false,
    weaponsList : []
  },
  mutations: {
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
  },
  actions: {
    async fetchWeaponsList({ commit }) {
      try {
          const response = await fetch(`${BASE_API_URL}/static/market/weapon?pageSize=20?pageNum=0`);
          const data = await response.json();
          console.log('data', data.results);
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
