import { toast } from 'react-toastify';

import { CHAIN } from '@/web3/config';
import { MetaMaskProvider } from '@/web3/types/metamask';

export const toHex = (decimal: number): string => `0x${decimal.toString(16)}`;

export function isMetamaskProvider(
  // eslint-disable-next-line
  library: any,
): library is MetaMaskProvider {
  return (
    library?.provider?.isMetaMask === true &&
    library?.provider?.request !== undefined
  );
}

type ErrorWithCode = {
  code: number;
};

export function isErrorWithCode(error: unknown): error is ErrorWithCode {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as Record<string, unknown>).code === 'number'
  );
}

const switchNetwork = async (
  library: MetaMaskProvider,
  chainId: number,
): Promise<boolean> =>
  library.provider.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: toHex(chainId) }],
  });

const addNetwork = async (library: MetaMaskProvider, chainId: number) => {
  try {
    await library.provider.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: toHex(chainId),
          chainName: CHAIN.chainName,
          nativeCurrency: CHAIN.nativeCurrency,
          rpcUrls: [CHAIN.rpcUrl],
          blockExplorerUrls: [CHAIN.blockExplorerUrl],
        },
      ],
    });
  } catch (error) {
    Promise.reject(error);
  }
};

export const setNetwork = async (
  library: MetaMaskProvider,
  chainId: number,
) => {
  try {
    await switchNetwork(library, chainId);
    return await Promise.resolve();
  } catch (switchError) {
    if (isErrorWithCode(switchError)) {
      if (switchError.code === -32002) {
        toast.info(`Please open wallet and switch to Goerli`);
      }
      if (switchError.code === 4902) return addNetwork(library, chainId);
    }
    return Promise.reject(switchError);
  }
};
