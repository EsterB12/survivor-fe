import { Wallet } from '@/hooks/useWallet/interfaces';

export interface Props {
  wallet: Wallet;
  account?: string;
}

const WalletButton = ({ wallet, account }: Props) => (
  <button
    type='button'
    className='heading-5 flex w-full cursor-pointer items-center justify-start gap-4 rounded-2xl bg-gray-0 px-3 py-5 text-center capitalize text-black hover:bg-gray-200'
    onClick={wallet.activate}
  >
    {account ? 'connected' : `connect ${wallet.name}`}
  </button>
);

export default WalletButton;
