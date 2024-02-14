import { TransactionStatus } from '@usedapp/core';
import { nanoid } from 'nanoid';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { CHAIN } from '@/web3/config';

export const useTransactionNotifications = (state: TransactionStatus) => {
  const transactionIdRef = useRef<string>('');

  const setNotificationId = (id: string) => {
    transactionIdRef.current = id;
  };

  useEffect(() => {
    if (state.status === 'PendingSignature') {
      const notificationId = nanoid();
      setNotificationId(notificationId);
      toast.info('Please sign transaction', {
        isLoading: true,
        toastId: notificationId,
      });
    }

    if (state.status === 'Mining') {
      toast.update(transactionIdRef.current, {
        isLoading: true,
        type: 'info',
        render: 'Transaction in Progress',
      });
    }

    if (state.status === 'Exception') {
      toast.update(transactionIdRef.current, {
        isLoading: false,
        type: 'error',
        render: state.errorCode === 4001 ? 'Transaction Denied' : 'Transaction Failed',
        autoClose: 2000,
      });
    }

    if (state.status === 'Fail') {
      toast.update(transactionIdRef.current, {
        isLoading: false,
        type: 'error',
        render: 'Transaction Failed',
        autoClose: 2000,
      });
    }

    if (state.status === 'Success') {
      toast.update(transactionIdRef.current, {
        isLoading: false,
        type: 'success',
        render: () => (
          <>
            <div>Transaction Successful</div>{' '}
            {state?.transaction?.hash && (
              <a
                href={CHAIN.getExplorerTransactionLink(state?.transaction?.hash)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check tx on {CHAIN.chainName}
              </a>
            )}
          </>
        ),
      });
    }
  }, [state]);
};