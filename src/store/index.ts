import { IMarketFilter } from '@/interface/filters.interface';
import { IWeb3Instance } from '@/interface/web3instance.interface';
import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_API_URL } from '../const/environments';
import Web3 from 'web3';
import createKeccakHash from 'keccak';
import _, { isUndefined } from 'lodash';

import { Contracts } from '../interface/Contracts';
import { INTERFACE_ID_TRANSFER_COOLDOWNABLE, setUpContracts } from '../contracts';

import {
  marketFilterToQueryDict,
  objToQueryParams
} from '../utils/route.utils';
import { getCharacterNameFromSeed } from '@/utils/character-name';
import { mergeQueryParams } from '@/utils/query-params';
let web3Instance : IWeb3Instance;
let web3: Web3;

Vue.use(Vuex);

const defaultCallOptions = (state: IState) => ({ from: state.defaultAccount });

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
  weaponId:      string;
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

export interface IBasePagination {
  currentPage: number,
  pageSize: number,
  totalItems: number
}

export interface IGlobalFilter {
  minPrice?: number,
  maxPrice?: number,
  sortBy?: string,
  dortDir?: number
}

export interface IState {
  contracts: Contracts,
  defaultAccount: string,
  currentWalletAddress : string,
  currentSkillBalance: number,
  currentBNBBalance  : number,
  chainId: string,
  metamaskConnected: boolean,
  weaponsList : any,
  characterList: any,
  globalBuyMarketFilter: IGlobalFilter,
  weaponListFilter: IMarketFilter,
  shieldListFilter: IMarketFilter,
  characterListFilter: IMarketFilter,
  weaponListPagination: IBasePagination,
  shieldAndArmorListPagination: IBasePagination,
  characterListPagination: IBasePagination,
  shieldList: Array<IShield>,
  characterRenames: any,
  isFetchWeaponListLoading: boolean,
  isFetchShieldAndArmorListLoading: boolean,
  isCharacterListLoading: boolean,
  characterStaminas: any
}

export const store = new Vuex.Store<IState>({
  state: {
    contracts: null!,
    defaultAccount: '',
    chainId: '',
    currentWalletAddress: '',
    currentBNBBalance : 0.00,
    currentSkillBalance : 0.00,
    metamaskConnected: false,
    weaponsList : [],
    characterList: [],
    globalBuyMarketFilter: {},
    weaponListFilter: {
      elementFilter: [],
      rarityFilter: [],
      maxPrice: Number.MAX_SAFE_INTEGER,
      minPrice: 0
    },
    shieldListFilter: {
      elementFilter: [],
      rarityFilter: [],
      maxPrice: Number.MAX_SAFE_INTEGER,
      minPrice: 0
    },
    characterListFilter: {
      elementFilter: [],
      rarityFilter: [],
      maxPrice: Number.MAX_SAFE_INTEGER,
      minPrice: 0
    },
    shieldList: [],
    weaponListPagination: {
      currentPage: 1,
      pageSize: 60,
      totalItems: 0
    },
    shieldAndArmorListPagination: {
      currentPage: 1,
      pageSize: 60,
      totalItems: 0
    },
    characterListPagination: {
      currentPage: 1,
      pageSize: 60,
      totalItems: 0
    },
    isFetchWeaponListLoading: false,
    isCharacterListLoading: false,
    isFetchShieldAndArmorListLoading: false,
    characterRenames: {},
    characterStaminas: {},
  },
  mutations: {
    setShieldListFilter(state, payload) {
      state.shieldListFilter = {
        ...state.shieldListFilter,
        ...payload.filter
      };
    },
    setGlobalFilter(state, payload: IGlobalFilter) {
      state.globalBuyMarketFilter = {
        ...payload
      }
    },
    setWeaponListFilter(state, payload) {
      state.weaponListFilter = {
        ...state.weaponListFilter,
        ...payload.filter
      };
    },
    setCharacterListFilter(state, payload) {
      state.characterListFilter = {
        ...state.characterListFilter,
        ...payload.filter
      };
    },
    setCurrentSkillBalance(state, payload) {
      state.currentSkillBalance = payload
    }, 
    setFetchWeaponListLoadingState(state, payload) {
      state.isFetchWeaponListLoading = payload;
    },
    setFetchCharacterListLoadingState(state, payload) {
      state.isCharacterListLoading = payload;
    },
    setFetchShieldAndArmorListLoadingState(state, payload) {
      state.isFetchShieldAndArmorListLoading = payload;
    },
    setCharacterListCurrentPage(state, payload) {
      state.characterListPagination.currentPage = Math.max(payload, 1)
    },
    setShieldAndArmorListCurrentPage(state, payload) {
      state.shieldAndArmorListPagination.currentPage = Math.max(payload, 1)
    },
    setWeaponListCurrentPage(state, payload) {
      state.weaponListPagination.currentPage = Math.max(payload, 1)
    },
    setWeaponListPagination(state, payload) {
      state.weaponListPagination = {
        ...state.weaponListPagination,
        pageSize: payload.pageSize,
        totalItems: payload.totalItems
      }
    },
    setShieldAndArmorListPagination(state, payload) {
      state.shieldAndArmorListPagination = {
        ...state.shieldAndArmorListPagination,
        pageSize: payload.pageSize,
        totalItems: payload.totalItems
      }
    },
    setCharacterListPagination(state, payload) {
      state.characterListPagination = {
        ...state.characterListPagination,
        pageSize: payload.pageSize,
        totalItems: payload.totalItems,
      }
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
    setShieldsList: (state, shieldList) => (state.shieldList = shieldList),
    setWeaponsList: (state, weapons) => (state.weaponsList = weapons),
    setCharacterList: (state, characters) => (state.characterList = characters),
    getShieldsList: function(state, payload) {
      state.shieldList = payload
    },
    getWeaponsList: function(state, payload) {
      state.weaponsList = payload
    },
    clearWeaponListFilter(state) {
      state.weaponListFilter = {
        elementFilter: [],
        rarityFilter: [],
        maxPrice: Number.MAX_SAFE_INTEGER,
        minPrice: 0
      };
    },
    setContracts(state: IState, payload) {
      state.contracts = payload;
    },
 },
  actions: {
    async initialize({ dispatch }) {
      console.log('inside initialize');
      await dispatch('setUpContracts');
    },
    async getMetamaskProvider({ dispatch }) {
      // check window ethereum provider
      if ((window as any).ethereum) {
        web3 = new Web3((window as any).ethereum);

        try {
          await (window as any).ethereum.enable()
          web3Instance = web3 as any;
          await dispatch('initialize');
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
    async fetchCharacterList({ commit }) {
      commit('setFetchCharacterListLoadingState', true);

      try {
        const paginationFilter = `pageNum=${this.state.characterListPagination.currentPage - 1}`
        const characterFilterParams = objToQueryParams(marketFilterToQueryDict(this.state.characterListFilter));
        const marketFilter = objToQueryParams(this.state.globalBuyMarketFilter);

        const queryParams = mergeQueryParams(characterFilterParams, paginationFilter, marketFilter);

        const response = await fetch(`${BASE_API_URL}/static/market/character${queryParams}`);
        const data = await response.json();

        console.log('test',  data.results);
        commit('setCharacterList', data.results);
        commit('setCharacterListPagination', {
          pageSize: data.page.pageSize,
          totalItems: data.page.total - 1
        });

        commit('setFetchCharacterListLoadingState', false);
      } catch (error) {
        console.log(error);

        commit('setFetchCharacterListLoadingState', false);
      }
    },
    async fetchWeaponsList({ commit }) {
      commit('setFetchWeaponListLoadingState', true);
      try {
          const paginationFilter = `pageNum=${this.state.weaponListPagination.currentPage - 1}`
          const weaponfilterParams = objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter));
          const marketFilter = objToQueryParams(this.state.globalBuyMarketFilter);

          const queryParams = mergeQueryParams(weaponfilterParams, paginationFilter, marketFilter);
          
          const response = await fetch(`${BASE_API_URL}/static/market/weapon${queryParams}`);
  
          const data = await response.json();
       
          commit('setWeaponsList', data.results);
          commit('setWeaponListPagination', {
            pageSize: data.page.pageSize,
            totalItems: data.page.total - 1
          });

          commit('setFetchWeaponListLoadingState', false);
          
      } catch (error) {
          console.log(error);
          commit('setFetchWeaponListLoadingState', false);
      }
    },
    async fetchShieldsList({commit}){
      commit('setFetchShieldAndArmorListLoadingState', true);

      try {
          const paginationFilter = `pageNum=${this.state.weaponListPagination.currentPage - 1}`
          const filterParams = objToQueryParams(marketFilterToQueryDict(this.state.weaponListFilter));
          
          const queryParams = mergeQueryParams(filterParams, paginationFilter);

          const response = await fetch(`${BASE_API_URL}/static/market/shield${queryParams}`);
          
          const data = await response.json();

          commit('setShieldsList', data.results);

          commit('setShieldAndArmorListPagination', {
            pageSize: data.page.pageSize,
            totalItems: data.page.total - 1
          });

          commit('setFetchShieldAndArmorListLoadingState', false);
      } catch (error) {
          commit('setFetchShieldAndArmorListLoadingState', false);

          console.error(error);
      }
    },
    async getMetamaskAccount({ commit, dispatch }) {
      web3 = new Web3((window as any).ethereum);
      web3Instance = web3 as any;
      await web3Instance.eth.getAccounts()
        .then(async (accounts:any) => {
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
    async getAccountBalance({ state, dispatch, commit }, account) {
      await dispatch('initialize');
      await web3Instance.eth.getBalance(toChecksumAddress(account))
        .then(async (balance: number) => {
          commit('setCurrentBNBBalance', Math.round(balance / (Math.pow(10, 18)) * 100) / 100);
          const skillBalance = await state.contracts.SkillToken?.methods
          .balanceOf(account)
          .call(defaultCallOptions(state));
          if (skillBalance) {
            commit('setCurrentSkillBalance',skillBalance);
          }
        })
        .catch((error: string) => {
          throw error
        })
    },
    async setUpContracts({ commit }) {
      const contracts = await setUpContracts(web3);
      console.log(contracts);
      commit('setContracts', contracts);
    },
    async purchaseWeaponListing({ state, dispatch }, { tokenId, maxPrice }: { nftContractAddr: string, tokenId: string, maxPrice: string }) {
      const { SkillToken,  NFTMarket, Weapons } = state.contracts;
      if(!SkillToken || !Weapons || !NFTMarket) return;

      await SkillToken.methods
      .approve(NFTMarket.options.address, maxPrice)
      .send(defaultCallOptions(state));
      
       const res = await NFTMarket.methods
           .purchaseListing(Weapons.options.address, tokenId, maxPrice)
           .send({
             from: state.defaultAccount,
           });

        const {
           seller,
           nftID,
           price
         } = res.events.PurchasedListing.returnValues;

        return { seller, nftID, price } as { seller: string, nftID: string, price: string };
    },
    async fetchWeaponsNftPrice({ state }, { tokenId }) {
      const { Weapons, NFTMarket } = state.contracts;
      if(!Weapons || !NFTMarket) return;

      return await NFTMarket.methods
        .getFinalPrice(
          Weapons.options.address,
          tokenId
        )
        .call(defaultCallOptions(state));
    },
    async purchaseCharactersListing({ state, dispatch }, { tokenId, maxPrice }: { nftContractAddr: string, tokenId: string, maxPrice: string }) {
      const { SkillToken,  NFTMarket, Characters } = state.contracts;
      if(!SkillToken || !Characters || !NFTMarket) return;

      await SkillToken.methods
      .approve(NFTMarket.options.address, maxPrice)
      .send(defaultCallOptions(state));
      
       const res = await NFTMarket.methods
           .purchaseListing(Characters.options.address, tokenId, maxPrice)
           .send({
             from: state.defaultAccount,
           });

        const {
           seller,
           nftID,
           price
         } = res.events.PurchasedListing.returnValues;

        return { seller, nftID, price } as { seller: string, nftID: string, price: string };
    },
    async fetchCharactersNftPrice({ state }, { tokenId }) {
      const { Characters, NFTMarket } = state.contracts;
      if(!Characters || !NFTMarket) return;

      return await NFTMarket.methods
        .getFinalPrice(
          Characters.options.address,
          tokenId
        )
        .call(defaultCallOptions(state));
    },
    async purchaseShieldListing({ state, dispatch }, { tokenId, maxPrice }: { nftContractAddr: string, tokenId: string, maxPrice: string }) {
      const { SkillToken,  NFTMarket, Shields } = state.contracts;
      if(!SkillToken || !Shields || !NFTMarket) return;

      await SkillToken.methods
      .approve(NFTMarket.options.address, maxPrice)
      .send(defaultCallOptions(state));
      
       const res = await NFTMarket.methods
           .purchaseListing(Shields.options.address, tokenId, maxPrice)
           .send({
             from: state.defaultAccount,
           });

        const {
           seller,
           nftID,
           price
         } = res.events.PurchasedListing.returnValues;

        return { seller, nftID, price } as { seller: string, nftID: string, price: string };
    },
    async fetchShieldsNftPrice({ state }, { tokenId }) {
      const { Shields, NFTMarket } = state.contracts;
      if(!Shields || !NFTMarket) return;

      return await NFTMarket.methods
        .getFinalPrice(
          Shields.options.address,
          tokenId
        )
        .call(defaultCallOptions(state));
    }
  },
    getters : {
      getCharacterStamina(state: IState) {
        return (characterId: number) => {
          return state.characterStaminas[characterId] || 0;
        };
      },
      getCharacterName(state: IState) {
        return (characterId: number) => {
          if(state.characterRenames[characterId] !== undefined){
            return state.characterRenames[characterId];
          }
          return getCharacterNameFromSeed(characterId);
        };
      },
      getShieldListFilterState: state => state.shieldListFilter,
      getFetchWeaponlistLoadingState: state => state.isFetchWeaponListLoading,
      getFetchCharacterlistLoadingState: state => state.isCharacterListLoading,
      getFetchShieldAndArmorListLoadingState: state => state.isFetchShieldAndArmorListLoading,
      getWeaponListPagination: state => state.weaponListPagination,
      getCharacterListPagination: state => state.characterListPagination,
      getShieldAndArmorListPagination: state => state.shieldAndArmorListPagination,
      getMetamaskConnected : state => state.metamaskConnected,
      defaultAccount : state => state.defaultAccount,
      currentWalletAddress : state => state.currentWalletAddress,
      currentBNBBalance : state => state.currentBNBBalance,
      currentSkillBalance : state => state.currentSkillBalance,
      allCharacters: state => state.characterList,
      allWeapons: (state) => state.weaponsList,
      allShields: (state) => state.shieldList,
      contracts(state: IState) {
        // our root component prevents the app from being active if contracts
        // are not set up, so we never need to worry about it being null anywhere else
        return _.isFunction(state.contracts) ? state.contracts : null!;
      }
  }
})
