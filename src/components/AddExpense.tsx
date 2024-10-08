import React, { useState } from 'react';
import { X, DollarSign } from 'lucide-react';
import { Group, Expense } from '../types';

interface AddExpenseProps {
  group: Group;
  onClose: () => void;
  onAddExpense: (expense: Expense) => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ group, onClose, onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(group.members[0] || '');
  const [splitType, setSplitType] = useState('equal');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense: Expense = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      paidBy,
      date: new Date().toISOString(),
      splitType,
    };
    onAddExpense(newExpense);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Add Expense</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition duration-300">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 font-semibold text-gray-300">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-100"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block mb-2 font-semibold text-gray-300">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign size={20} className="text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-100"
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="paidBy" className="block mb-2 font-semibold text-gray-300">
              Paid By
            </label>
            <select
              id="paidBy"
              value={paidBy}
              onChange={(e) => setPaidBy(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-100"
              required
            >
              {group.members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="splitType" className="block mb-2 font-semibold text-gray-300">
              Split Type
            </label>
            <select
              id="splitType"
              value={splitType}
              onChange={(e) => setSplitType(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-100"
              required
            >
              <option value="equal">Equal Split</option>
              <option value="byPercentage">By Percentage</option>
              <option value="custom">Custom Split</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-gray-100 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;