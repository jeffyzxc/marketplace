
import { abi as erc20Abi } from '../build/contracts/IERC20.json';
import { abi as cryptoBladesAbi, networks as cryptoBladesNetworks } from '../build/contracts/CryptoBlades.json';
import { abi as marketAbi, networks as marketNetworks } from '../build/contracts/NFTMarket.json';
import { abi as weaponsAbi } from '../build/contracts/Weapons.json';
import { networks as skillTokenNetworks } from '../build/contracts/SkillToken.json';

import Web3 from 'web3';
import { Contracts } from './interface/Contracts';

const networkId = process.env.VUE_APP_NETWORK_ID || '5777';

type Networks = Partial<Record<string, { address: string }>>;

type Abi = any[];

interface MarketContracts {
  NFTMarket?: Contracts['NFTMarket'];
}

export async function setUpContracts(web3: Web3): Promise<Contracts> {

  const skillTokenAddress = process.env.VUE_APP_SKILL_TOKEN_CONTRACT_ADDRESS || (skillTokenNetworks as Networks)[networkId]!.address;
  console.log('before skill');
  const SkillToken = new web3.eth.Contract(erc20Abi as Abi, skillTokenAddress);
  console.log('after skill');
  const cryptoBladesContractAddr = process.env.VUE_APP_CRYPTOBLADES_CONTRACT_ADDRESS || (cryptoBladesNetworks as Networks)[networkId]!.address;

  console.log('before blades');
  const CryptoBlades = new web3.eth.Contract(cryptoBladesAbi as Abi, cryptoBladesContractAddr);
  console.log('after blades');

  console.log('before weapons');
  const [ weaponsAddr] = await Promise.all([
    CryptoBlades.methods.weapons().call()
  ]);
  console.log('after weapons address');
  const Weapons = new web3.eth.Contract(weaponsAbi as Abi, weaponsAddr);
  console.log('after weapons');

  const marketContracts: MarketContracts = {};
  const marketContractAddr = process.env.VUE_APP_MARKET_CONTRACT_ADDRESS || (marketNetworks as Networks)[networkId]!.address;
  marketContracts.NFTMarket = new web3.eth.Contract(marketAbi as Abi, marketContractAddr);
  console.log('before return');
  return {
    ...marketContracts,
    Weapons,
    SkillToken
  };
}

export const INTERFACE_ID_TRANSFER_COOLDOWNABLE = '0xe62e6974';