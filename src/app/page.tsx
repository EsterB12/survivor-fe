'use client';

import { DAppProvider } from '@usedapp/core';
import Head from 'next/head';
import * as React from 'react';

import { DAPP_CONFIG } from '@/web3/config';

export default function HomePage() {
  return (
    <DAppProvider config={DAPP_CONFIG}>
      <main>
        <Head>
          <title>Hi</title>
        </Head>

        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1 className='mt-4'>Play Game:</h1>
            <div className='flex flex-col gap-4 items-center w-full'>
              <div className='flex w-full justify-center gap-8 p-3'>
                <div className='flex flex-col gap-2'>
                  <label>Name:</label>
                  <input />
                </div>
                <div className='flex flex-col gap-2'>
                  <label>Guess:</label>
                  <input />
                </div>
              </div>
              <button
                type='button'
                className='bg-sky-300 border-[1px] border-black px-2 py-1'
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      </main>
    </DAppProvider>
  );
}
