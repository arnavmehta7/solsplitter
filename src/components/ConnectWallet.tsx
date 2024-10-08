import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWallet: React.FC = () => {
  const { wallet, connected } = useWallet();

  return (
    <div>
      <WalletMultiButton className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
        {connected ? 'Connected' : 'Connect Wallet'}
      </WalletMultiButton>
    </div>
  );
};

export default ConnectWallet;