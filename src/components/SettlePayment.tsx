import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Group } from '../types';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface SettlePaymentProps {
  group: Group;
  onClose: () => void;
  onSettlePayment: (from: string, to: string, amount: number) => void;
}

const SettlePayment: React.FC<SettlePaymentProps> = ({ group, onClose, onSettlePayment }) => {
  const [from, setFrom] = useState(group.members[0] || '');
  const [to, setTo] = useState(group.members[1] || '');
  const [amount, setAmount] = useState('');
  const [fromPublicKey, setFromPublicKey] = useState('');
  const [toPublicKey, setToPublicKey] = useState('');

  useEffect(() => {
    // In a real app, you would fetch these from a backend or wallet connection
    setFromPublicKey('FromUserSolanaPublicKeyHere');
    setToPublicKey('ToUserSolanaPublicKeyHere');
  }, [from, to]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountValue = parseFloat(amount);

    if (isNaN(amountValue) || amountValue <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      // Connect to the Solana devnet
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

      // Create a new transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(fromPublicKey),
          toPubkey: new PublicKey(toPublicKey),
          lamports: amountValue * LAMPORTS_PER_SOL,
        })
      );

      // In a real app, you would sign this transaction with the user's wallet
      // For demo purposes, we're just logging the transaction
      console.log('Transaction created:', transaction);

      // Simulate sending the transaction
      alert(`Transaction sent! ${from} paid ${to} ${amount} SOL`);

      onSettlePayment(from, to, amountValue);
    } catch (error) {
      console.error('Error creating transaction:', error);
      alert('Failed to create transaction. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Settle Payment</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition duration-300">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="from" className="block mb-2 font-semibold text-gray-300">
              From
            </label>
            <select
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              required
            >
              {group.members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="to" className="block mb-2 font-semibold text-gray-300">
              To
            </label>
            <select
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              required
            >
              {group.members.filter(member => member !== from).map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="amount" className="block mb-2 font-semibold text-gray-300">
              Amount (SOL)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              required
              min="0"
              step="0.000000001"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-gray-100 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Settle Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettlePayment;