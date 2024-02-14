import { useEthers } from '@usedapp/core';
import { createContext, useCallback, useContext, useMemo } from 'react';

import WalletButton from '@/components/buttons/WalletButton';

import {
  MetaMaskProvider,
  Wallet,
  WalletProviderProps,
  WalletToken,
} from './interfaces';

const WalletContext = createContext<
  | {
      wallets: Wallet[];
      addToken: (token: WalletToken) => void;
    }
  | undefined
>(undefined);

const WalletProvider = ({ children }: WalletProviderProps) => {
  const { library, activateBrowserWallet, account } = useEthers();
  const wallets: Wallet[] = useMemo(
    () => [
      {
        name: 'metamask',
        activate: activateBrowserWallet,
      },
    ],
    [activateBrowserWallet],
  );

  // ❌ Buggy MetaMask feature, avoid using.

  const addToken = useCallback(
    (token: WalletToken) => {
      const { address, symbol, decimals } = token;

      (library as unknown as MetaMaskProvider).provider.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address,
            symbol,
            decimals,
          },
        },
      });
    },
    [library],
  );

  const value = useMemo(
    () => ({
      wallets,
      addToken,
    }),
    [addToken, wallets],
  );

  return (
    <WalletContext.Provider value={value}>
      {wallets.map((wallet) => (
        <WalletButton
          key={`WalletButon-${wallet.name}`}
          wallet={wallet}
          account={account}
        />
      ))}
      {children}
    </WalletContext.Provider>
  );
};

const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet can only be used inside WalletProvider');
  }
  return context;
};

export { useWallet, WalletProvider };
