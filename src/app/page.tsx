'use client';

import { BigNumber } from 'ethers';
import Head from 'next/head';
import * as React from 'react';
import { ChangeEvent, useState } from 'react';

import {
  useGetWinnerNameAndScore,
  useGuessedPreviously,
  useGuessNumber,
} from '@/hooks/useSurvivor';

export default function HomePage() {
  const [name, setName] = useState('');
  const [guess, setGuess] = useState('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleGuessChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGuess(event.target.value);
  };

  const { onSubmit } = useGuessNumber();

  const data = useGetWinnerNameAndScore();

  const hasGuessed = useGuessedPreviously();

  if (!data || !hasGuessed) {
    return;
  }

  const handleSubmit = async () => {
    Promise.resolve(onSubmit(name, BigNumber.from(guess)));
  };

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <div className='grid grid-cols-2 w-full'>
            <div>
              <h1 className='mt-4'>Play Game:</h1>
              <form className='flex flex-col gap-4 items-center w-full'>
                <div className='flex w-full justify-center gap-8 p-3'>
                  <div className='flex flex-col gap-2'>
                    <label>Name:</label>
                    <input value={name} onChange={handleNameChange} />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label>Guess:</label>
                    <input value={guess} onChange={handleGuessChange} />
                  </div>
                </div>
                {hasGuessed[0] ? (
                  <button
                    type='button'
                    className='bg-sky-300 border-[1px] border-black px-2 py-1'
                    onClick={() => onSubmit(name, BigNumber.from(guess))}
                    disabled
                  >
                    Already guessed!
                  </button>
                ) : (
                  <button
                    type='button'
                    className='bg-sky-300 border-[1px] border-black px-2 py-1'
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                )}

                <div className='flex flex-col items-center text-center'>
                  <span>Instructions:</span>
                  <span>
                    Guess any number between 1 and 1000, the game will then
                    randomly generate a number between 1 and 1000. Whoever has
                    the smallest difference between the 2 wins. P.S the random
                    number changes every turn.
                  </span>
                </div>
              </form>
            </div>
            <div className='flex flex-col gap-3 items-center'>
              <h2>Who is in the lead so far?</h2>
              <div className='flex gap-2'>
                <span>Name:</span>
                <span>{data?.winnerName ?? 'None yet'}</span>
              </div>
              <div className='flex gap-2'>
                <span>Number:</span>
                <span>{data?.winnerGuess.toString() ?? 'None yet'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
