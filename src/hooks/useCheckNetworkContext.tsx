import { useCallback } from 'react';
import { toast } from 'react-toastify';

import { useNetwork } from './useNetwork';

export function useCheckNetworkCallback<T>(
  // eslint-disable-next-line
  callback: (args: T) => void | Promise<any>,
) {
  const {
    networkNotificationId,
    switchNetwork,
    status: network,
  } = useNetwork();

  const wrappedCallback = useCallback(
    async (args: T) => {
      if (!callback) return;
      if (network === 'correct') {
        callback(args);
        return;
      }

      if (network === 'incorrect') {
        try {
          await switchNetwork();
          networkNotificationId && toast.dismiss(networkNotificationId);

          callback(args);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
        return;
      }
    },
    [callback, network, networkNotificationId, switchNetwork],
  );

  return wrappedCallback;
}
