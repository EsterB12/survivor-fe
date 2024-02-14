'use client';

import { DAppProvider } from '@usedapp/core';

import { NetworkProvider } from '@/hooks/useNetwork';
import { WalletProvider } from '@/hooks/useWallet';

import { DAPP_CONFIG } from '@/web3/config';

export function Providers(props: { children: React.ReactNode }) {
  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <DAppProvider config={DAPP_CONFIG}>
      <WalletProvider>
        <NetworkProvider>{props.children}</NetworkProvider>
      </WalletProvider>
    </DAppProvider>
    // </ThemeProvider>
  );
}
