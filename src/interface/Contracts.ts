import { Contract as Web3EthContract } from 'web3-eth-contract';
import type {
  IERC20, NFTMarket, Weapons, Characters, Shields
} from '../../build/abi-interfaces';


interface TypeSafeContract<Abi> {
  methods: Abi;
}

export type Contract<Abi> = Omit<Web3EthContract, 'methods'> & TypeSafeContract<Abi>;



export interface Contracts {
  NFTMarket?: Contract<NFTMarket>;
  Weapons?: Contract<Weapons>;
  Characters?: Contract<Characters>;
  Shields?: Contract<Shields>;
  SkillToken?: Contract<IERC20>;
}
