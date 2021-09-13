import { Contract as Web3EthContract } from 'web3-eth-contract';
import type {
  IERC20, NFTMarket, Weapons
} from '../../build/abi-interfaces';


interface TypeSafeContract<Abi> {
  methods: Abi;
}

export type Contract<Abi> = Omit<Web3EthContract, 'methods'> & TypeSafeContract<Abi>;



export interface Contracts {
  NFTMarket?: Contract<NFTMarket>;
  Weapons?: Contract<Weapons>;
  SkillToken?: Contract<IERC20>;
}
