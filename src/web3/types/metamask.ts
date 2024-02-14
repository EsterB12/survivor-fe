import { providers } from 'ethers';

// use this interface for type assertion inside addERC20ToMetamask()
interface WatchAssetParams {
  type: 'ERC20'; // In the future, other standards will be supported
  options: {
    address: string; // The address of the token contract
    symbol: string; // A ticker symbol or shorthand, up to 5 characters
    decimals: number; // The number of token decimals
    image: string; // A string url of the token logo
  };
}

interface SwitchEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
}

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export interface RequestArguments {
  /** The RPC method to request. */
  method: string;

  /** The params of the RPC method, if any. */
  params?:
    | unknown[]
    | Record<string, unknown>
    | WatchAssetParams
    | AddEthereumChainParameter
    | SwitchEthereumChainParameter;
}

export interface MetaMaskProvider extends providers.JsonRpcProvider {
  provider: {
    request: (params: RequestArguments) => Promise<boolean>;
    isMetaMask: boolean;
  };
}
