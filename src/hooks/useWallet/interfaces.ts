import { JsonRpcProvider } from '@ethersproject/providers';
import { ReactNode } from 'react';

export interface Wallet {
  name: string;
  activate: () => void;
}

export interface WalletProviderProps {
  children?: ReactNode;
}

export interface WalletToken {
  address: string;
  symbol?: string;
  decimals?: number;
  image?: string;
}

interface WatchAssetParams {
  method: string;
  params: {
    type: string;
    options: WalletToken;
  };
}

export interface MetaMaskProvider extends JsonRpcProvider {
  provider: { request: (params: WatchAssetParams) => Promise<boolean> };
}
