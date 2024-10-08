import React from 'react';
import { Users, ArrowRight } from 'lucide-react';

interface EmptyStateProps {
  onCreateGroup: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onCreateGroup }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="bg-purple-600 rounded-full p-4 mx-auto mb-6 w-20 h-20 flex items-center justify-center">
          <Users size={40} className="text-gray-100" />
        </div>
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Welcome to Solana Splitwise</h2>
        <p className="text-gray-400 mb-6">
          Get started by creating your first group to split expenses with friends on the Solana blockchain.
        </p>
        <button
          onClick={onCreateGroup}
          className="bg-purple-600 text-gray-100 px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center w-full"
        >
          Create Your First Group
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default EmptyState;