import { useCall, useContractFunction, useEthers } from '@usedapp/core';

import { contract } from '@/web3/config';

import { useTransactionNotifications } from './useTransactionNotifications';

export const useWinnerName = () => {
  const { value, error } =
    useCall({
      contract: contract.Survivor,
      method: 'currentWinner',
      args: [],
    }) ?? {};
  if (error) {
    return undefined;
  }
  if (value) {
    return value;
  }
  return undefined;
};

export const useWinnerScore = () => {
  const { value, error } =
    useCall({
      contract: contract.Survivor,
      method: 'currentWinnerScore',
      args: [],
    }) ?? {};
  if (error) {
    return undefined;
  }
  if (value) {
    return value;
  }
  return undefined;
};

export const useHasGuessed = () => {
  const {account} = useEthers()
  const {value, error} = 
    useCall({
      contract: contract.Survivor,
      method: 'guessed',
      args: [account as string],
    }) ?? {};
  if (error) {
    return undefined;
  }
  if (value) {
    return value;
  }
  return undefined;
};




export const useContractPlayGame = () => {
  const { state, send } = useContractFunction(contract.Survivor, 'playGame', {
    transactionName: 'Play Game',
  });

  useTransactionNotifications(state);

  return {
    playGame: send,
    playGameState: state,
  };
};
