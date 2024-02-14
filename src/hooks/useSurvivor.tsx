// import { useEthers } from '@usedapp/core';
// import { useRouter } from 'next/router';
// import { toast } from 'react-toastify';

import { useEthers } from '@usedapp/core';
import { BigNumber } from 'ethers';
import { toast } from 'react-toastify';

import {
  useContractPlayGame,
  useHasGuessed,
  useWinnerName,
  useWinnerScore,
} from '@/web3/services/survivor';

export const useGuessNumber = () => {
  const { account } = useEthers();

  const { playGame } = useContractPlayGame();

  const onSubmit = async (name: string, guess: BigNumber) => {
    if (!account) {
      toast.error('Please connect your wallet');
      return false;
    }
    const tx = await playGame(name, guess);
    if (tx) {
      toast.success('Entry Submitted!');
    }
  };

  return { onSubmit };
};

export const useGetWinnerNameAndScore = () => {
  const winnerName = useWinnerName();
  const winnerGuess = useWinnerScore();

  if (!winnerName || !winnerGuess) {
    return undefined;
  }
  return {
    winnerName,
    winnerGuess,
  };
};

export const useGuessedPreviously = () => {
  const hasGuessed = useHasGuessed();
  return hasGuessed;
};
