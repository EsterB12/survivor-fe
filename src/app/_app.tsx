import { DAppProvider } from '@usedapp/core';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';

import { NetworkProvider } from '@/hooks/useNetwork';
import { WalletProvider } from '@/hooks/useWallet';

import { DAPP_CONFIG } from '@/web3/config';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
    </Head>
    <DAppProvider config={DAPP_CONFIG}>
      <WalletProvider>
        <NetworkProvider>
          <Component {...pageProps} />
        </NetworkProvider>
      </WalletProvider>
    </DAppProvider>
  </>
);
export default MyApp;
