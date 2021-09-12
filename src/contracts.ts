
import { abi as marketAbi, networks as marketNetworks } from '../build/contracts/NFTMarket.json';

import Web3 from 'web3';
import { Contracts } from './interface/Contracts';

const networkId = process.env.VUE_APP_NETWORK_ID || '5777';

type Networks = Partial<Record<string, { address: string }>>;

type Abi = any[];

interface MarketContracts {
  NFTMarket?: Contracts['NFTMarket'];
}

export async function setUpContracts(web3: Web3): Promise<Contracts> {
  const marketContracts: MarketContracts = {};
  const marketContractAddr = process.env.VUE_APP_MARKET_CONTRACT_ADDRESS || (marketNetworks as Networks)[networkId]!.address;
  marketContracts.NFTMarket = new web3.eth.Contract(marketAbi as Abi, marketContractAddr);
  return {
    ...marketContracts
  };
}

export const INTERFACE_ID_TRANSFER_COOLDOWNABLE = '0xe62e6974';