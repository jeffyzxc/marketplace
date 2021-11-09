import { IMarketFilter } from '@/interface/filters.interface';
import { IWeb3Instance } from '@/interface/web3instance.interface';
import Vue from 'vue'
import Vuex from 'vuex'
import { BASE_API_URL } from '../environment/environments';
import Web3 from 'web3';
import createKeccakHash from 'keccak';
import {
  stakeOnly as featureFlagStakeOnly,
} from './../utils/feature-flags';
import { market_blockchain as useBlockchain } from './../utils/feature-flags';

import { Contracts } from '../interface/Contracts';
import { setUpContracts } from '../contracts';

import {
  marketFilterToQueryDict,
  objToQueryParams
} from '../utils/route.utils';
import { getCharacterNameFromSeed } from '@/utils/character-name';
import { mergeQueryParams } from '@/utils/query-params';
import { weaponFromContract } from '@/utils/weapon.utils';
import { IWeapon } from '@/interface/weapon.inteface';
import { characterFromContract } from '@/utils/characters';
import { ICharacter } from '@/interface/character';
import { CHARACTER_MAX_STAMINA } from '@/default/character.default';
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
  defaultAccount: string | null,
  currentWalletAddress : string,
  currentSkillBalance: number,
  currentBNBBalance  : number,
  chainId: string,
  metamaskConnected: boolean,
  characters: Record<number, ICharacter>;
  globalBuyMarketFilter: IGlobalFilter,
  weapons: Record<number, IWeapon>;
  weaponDurabilities: Record<number, number>;
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
    weapons: {},
    weaponDurabilities: {},
    characters: {},
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
    updateCharacter(state: IState, { characterId, character }) {
      Vue.set(state.characters, characterId, character);
    },
    updateWeaponDurability(state: IState, { weaponId, durability }) {
      Vue.set(state.weaponDurabilities, weaponId, durability);
    },
    clearWeapons(state: IState) {
      state.weapons = {};
    },
    updateWeapon(state: IState, { weaponId, weapon }) {
      Vue.set(state.weapons, weaponId, weapon);
    },
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
    getShieldsList: function(state, payload) {
      state.shieldList = payload
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
    async fetchAllMarketCharacterNftIdsPage({ state }, { nftContractAddr, limit, pageNumber, trait, minLevel, maxLevel }) {
      const { NFTMarket } = state.contracts;
      if(!NFTMarket) return;

      return await NFTMarket.methods
        .getCharacterListingIDsPage(
          nftContractAddr,
          limit,
          pageNumber,
          trait,
          minLevel,
          maxLevel
        )
        .call(defaultCallOptions(state));
    },
    async fetchNumberOfCharacterListings({ state }, { nftContractAddr, trait, minLevel, maxLevel }) {
      const { NFTMarket } = state.contracts;
      if(!NFTMarket) return;

      // returns an array of bignumbers (these are nft IDs)
      return await NFTMarket.methods
        .getNumberOfCharacterListings(
          nftContractAddr,
          trait,
          minLevel,
          maxLevel
        )
        .call(defaultCallOptions(state));
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
    async getCBKLandPrice({state}, {tier}) {
      const { Blacksmith } = state.contracts;

      console.log(await Blacksmith?.methods.getCBKLandPrice(tier, 0));

      return await Blacksmith?.methods
        .getCBKLandPrice(tier, 0)
        .call(defaultCallOptions(state));
    },
    async fetchAllMarketWeaponNftIdsPage({ state }, { nftContractAddr, limit, pageNumber, trait, stars }) {
      const { NFTMarket } = state.contracts;
      if(!NFTMarket) return;

      return await NFTMarket.methods
        .getWeaponListingIDsPage(
          nftContractAddr,
          limit,
          pageNumber,
          trait,
          stars
        )
        .call(defaultCallOptions(state));
    },
    async fetchNumberOfWeaponListings({ state }, { nftContractAddr, trait, stars }) {
        const { NFTMarket } = state.contracts;
        if(!NFTMarket) return;

        // returns an array of bignumbers (these are nft IDs)
        return await NFTMarket.methods
          .getNumberOfWeaponListings(
            nftContractAddr,
            trait,
            stars
          )
          .call(defaultCallOptions(state));
    },
    async fetchIsLandSaleAllowed({state}) {
      const { CBKLandSale } = state.contracts;

      return await CBKLandSale?.methods
        .salesAllowed()
        .call(defaultCallOptions(state));
    },
    async fetchMarketNftPrice({ state }, { nftContractAddr, tokenId }) {
      const { NFTMarket } = state.contracts;
      if(!NFTMarket) return;
      
      return await NFTMarket.methods
        .getFinalPrice(
          nftContractAddr,
          tokenId
        )
        .call(defaultCallOptions(state));
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
    async fetchMarketNftTargetBuyer({ state }, { nftContractAddr, tokenId }) {
      const { NFTMarket } = state.contracts;
      if(!NFTMarket) return;

      // returns the listing's target buyer address
      return await NFTMarket.methods
        .getTargetBuyer(
          nftContractAddr,
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
    async fetchCharacters({ dispatch }, characterIds: (string | number)[]) {
      await Promise.all(characterIds.map(id => dispatch('fetchCharacter', id)));
    },
    async fetchCharacter({ state, commit }, characterId: string | number) {
      const { Characters } = state.contracts;
      if(!Characters) return;

      await Promise.all([
        (async () => {
          const character = characterFromContract(
            characterId,
            await Characters.methods.get('' + characterId).call(defaultCallOptions(state))
          );

          commit('updateCharacter', { characterId, character });
        })(),
      ]);
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
    },
    async fetchWeapons({ commit, dispatch }, weaponIds: (string | number)[]) {
      commit('clearWeapons');
      await Promise.all(weaponIds.map(id => dispatch('fetchWeapon', id)));
    },
    async fetchWeapon({ state, commit, dispatch }, weaponId: string | number) {
      const { Weapons } = state.contracts;
      if(!Weapons) return;
      
      await Promise.all([
        (async () => {
          const weapon = weaponFromContract(
            weaponId,
            await Weapons.methods.get('' + weaponId).call(defaultCallOptions(state))
          );
          commit('updateWeapon', { weaponId, weapon });
        })(),
      ]);
      dispatch('fetchWeaponDurability', weaponId);
    },
    async fetchWeaponDurability({ state, commit }, weaponId: number) {
      if(featureFlagStakeOnly) return;

      const durabilityString = await state.contracts.Weapons!.methods
        .getDurabilityPoints('' + weaponId)
        .call(defaultCallOptions(state));

      const durability = parseInt(durabilityString, 10);
      if (state.weaponDurabilities[weaponId] !== durability) {
        commit('updateWeaponDurability', { weaponId, durability });
      }
    },
  },
  getters : {
      getWeaponDurability(state: IState) {
        return (weaponId: number) => {
          return state.weaponDurabilities[weaponId];
        };
      },
      timeUntilCharacterHasMaxStamina(state, getters) {
        return (id: number) => {
          const currentStamina = getters.getCharacterStamina(id);

          if (!currentStamina && currentStamina !== 0) {
            return '';
          }

          const date = new Date();
          if (CHARACTER_MAX_STAMINA !== currentStamina) {
            date.setTime(date.getTime() + ((CHARACTER_MAX_STAMINA - 5) * (5 * 60000)));
          }

          return(`${
            (date.getMonth()+1).toString().padStart(2, '0')}/${
            date.getDate().toString().padStart(2, '0')}/${
            date.getFullYear().toString().padStart(4, '0')} ${
            date.getHours().toString().padStart(2, '0')}:${
            date.getMinutes().toString().padStart(2, '0')}:${
            date.getSeconds().toString().padStart(2, '0')}`
          );
        };
      },
      weaponContractAddress(state: IState) {
        return state.contracts && state.contracts.Weapons ? state.contracts.Weapons.options.address : null;
      },
      characterContractAddress(state: IState) {
        return state.contracts && state.contracts.Characters ? state.contracts.Characters.options.address : null;
      },
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
      weapons: (state) => state.weapons,
      characters: (state) => state.characters,
      allShields: (state) => state.shieldList,
      weaponsWithIds(state) {
        return (weaponIds: (string | number)[]) => {
          const weapons = weaponIds.map(id => state.weapons[+id]);
          if (weapons.some((w) => w === null)) return [];
          return weapons;
        };
      },
      contracts(state: IState) {
        // our root component prevents the app from being active if contracts
        // are not set up, so we never need to worry about it being null anywhere else
        return state.contracts;
      }
  }
})
