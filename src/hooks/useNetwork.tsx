'use client';
import { useEthers } from '@usedapp/core';
import { nanoid } from 'nanoid';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { usePrevious } from '@/hooks/usePrevious';

import { CHAIN } from '@/web3/config';
import { MetaMaskProvider } from '@/web3/types/metamask';
import { setNetwork } from '@/web3/utils';

type Status = 'correct' | 'incorrect' | 'idle';

export interface ProviderProps {
  children: React.ReactNode;
}

interface ContextProps {
  status: Status;
  switchNetwork: () => Promise<void>;
  networkNotificationId: string | undefined;
  setNetworkNotificationId: (id: string) => void;
}

const NetworkContext = createContext<ContextProps>({
  status: 'idle',
} as ContextProps);

export const NetworkProvider = ({ children }: ProviderProps) => {
  const { chainId, active, account, library } = useEthers();

  const [status, setStatus] = useState<Status>('idle');

  const previousChainId = usePrevious(chainId);
  const networkNotificationId = useRef<string | undefined>();

  const setNetworkNotificationId = (id: string) => {
    networkNotificationId.current = id;
  };

  const switchNetwork = useCallback(async () => {
    try {
      if (status === 'incorrect') {
        await setNetwork(library as MetaMaskProvider, CHAIN.chainId);
        return await Promise.resolve();
      }
    } catch (error) {
      return Promise.reject(error);
    }
    return Promise.resolve();
  }, [library, status]);

  const hasSwitchedFromIncorrectChain = useCallback(() => {
    if (previousChainId === undefined) {
      return false;
    }

    if (chainId === CHAIN.chainId) {
      return true;
    }

    return false;
  }, [chainId, previousChainId]);

  useEffect(() => {
    if (chainId !== undefined && chainId !== CHAIN.chainId) {
      networkNotificationId.current = nanoid();
      toast.warning(`Wrong Network. Please switch to ${CHAIN.chainName}`, {
        toastId: networkNotificationId.current,
      });
      setNetwork(library as MetaMaskProvider, CHAIN.chainId);
    }
  }, [chainId, library, switchNetwork]);

  useEffect(() => {
    if (hasSwitchedFromIncorrectChain() && status === 'correct') {
      networkNotificationId?.current &&
        toast.dismiss(networkNotificationId.current);
      const newId = nanoid();
      toast.success(`Correct Network`, {
        toastId: newId,
      });
      networkNotificationId.current = newId;
    }
  }, [chainId, hasSwitchedFromIncorrectChain, status]);

  useEffect(() => {
    if (account === undefined) {
      setStatus('idle');
      return;
    }

    if (!active || chainId !== CHAIN.chainId || account === undefined) {
      setStatus('incorrect');
      return;
    }
    setStatus('correct');
  }, [account, active, chainId]);

  const value = useMemo(
    () => ({
      status,
      switchNetwork,
      networkNotificationId: networkNotificationId.current,
      setNetworkNotificationId,
    }),
    [status, switchNetwork],
  );

  return (
    <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (context === undefined) {
    throw new Error('useNetwork can only be used inside NetworkProvider');
  }
  return context;
};
