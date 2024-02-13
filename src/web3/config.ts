import { Config } from '@usedapp/core';
import { Contract, Fragment, Interface, JsonFragment } from 'ethers';

export const DAPP_CONFIG: Config = {
  refresh: 'everyBlock',
  noMetamaskDeactivate: true,
  readOnlyUrls: {
    [5]: 'https://www.ankr.com/rpc/eth/eth_goerli/',
  },
  autoConnect: true,
  notifications: {
    expirationPeriod: 5000,
    checkInterval: 2000,
  },
};

export const loadInterface = (
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>
): Interface => new Interface(abi);

export const loadContract = <T>(
  abi: string | ReadonlyArray<Fragment | JsonFragment | string>,
  address: string
): T => {
  const contractInterface = loadInterface(abi);
  const contract = new Contract(address, contractInterface);

  return contract as unknown as T;
};

export const contracts = {
  collectionFactory: loadContract<CollectionFactory>(
    CollectionFactoryJSON.abi,
    COLLECTION_FACTORY_ADDRESS
  ),
} as const;
