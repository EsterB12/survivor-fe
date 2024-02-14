import { JsonFragment } from '@ethersproject/abi';
import { Chain, Config, Goerli } from '@usedapp/core';
import { Contract } from 'ethers';
import { Fragment, Interface } from 'ethers/lib/utils';

import SurvivorJSON from '@/web3/abi/Survivor.sol/Survivor.json';
import { Survivor } from '@/web3/typechain';

export const chainToNetwork: { readonly [key: number]: Chain } = {
  5: Goerli,
};

export const CHAIN = chainToNetwork[5];

export const DAPP_CONFIG: Config = {
  refresh: 'everyBlock',
  noMetamaskDeactivate: true,
  autoConnect: true,
  notifications: {
    expirationPeriod: 30000,
    checkInterval: 2000,
  },
  readOnlyChainId: 5,
  readOnlyUrls: {
    [5]: 'https://rpc.ankr.com/eth_goerli',
  },
};

export const loadInterface = (
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
): Interface => new Interface(abi);

export const loadContract = <T>(
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
  address: string,
): T => {
  const contractInterface = loadInterface(abi);
  const contract = new Contract(address, contractInterface);

  return contract as unknown as T;
};

export const contract = {
  Survivor: loadContract<Survivor>(
    SurvivorJSON.abi,
    '0xB4528213285CD10Fdb6a14847a398d71670b3d61',
  ),
} as const;
