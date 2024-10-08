import React, { useState, useMemo } from 'react';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  Users,
  PlusCircle,
  DollarSign,
  Menu,
  Trash2,
  UserCog,
  CreditCard,
} from 'lucide-react';
import GroupList from './components/GroupList';
import CreateGroup from './components/CreateGroup';
import AddExpense from './components/AddExpense';
import EmptyState from './components/EmptyState';
import GroupManagement from './components/GroupManagement';
import SettlePayment from './components/SettlePayment';
import ConnectWallet from './components/ConnectWallet';
import { Group, Expense } from './types';

// Import Solana wallet adapter styles
import '@solana/wallet-adapter-react-ui/styles.css';

function App() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showGroupManagement, setShowGroupManagement] = useState(false);
  const [showSettlePayment, setShowSettlePayment] = useState(false);

  const network = WalletAdapterNetwork.Devnet;

  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  const handleCreateGroup = (newGroup: Group) => {
    setGroups([...groups, newGroup]);
    setShowCreateGroup(false);
  };

  const handleAddExpense = (expense: Expense) => {
    if (selectedGroup) {
      const updatedGroup = {
        ...selectedGroup,
        expenses: [...selectedGroup.expenses, expense],
      };
      setGroups(
        groups.map((g) => (g.id === selectedGroup.id ? updatedGroup : g))
      );
      setSelectedGroup(updatedGroup);
      setShowAddExpense(false);
    }
  };

  const handleUpdateGroup = (updatedGroup: Group) => {
    setGroups(groups.map((g) => (g.id === updatedGroup.id ? updatedGroup : g)));
    setSelectedGroup(updatedGroup);
    setShowGroupManagement(false);
  };

  const handleDeleteGroup = () => {
    if (selectedGroup) {
      setGroups(groups.filter((g) => g.id !== selectedGroup.id));
      setSelectedGroup(null);
    }
  };

  return (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
            <header className="bg-gray-800 text-gray-100 p-4 shadow-lg">
              <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                  {groups.length > 0 && (
                    <button
                      onClick={() => setShowSidebar(!showSidebar)}
                      className="mr-4 lg:hidden"
                    >
                      <Menu size={24} />
                    </button>
                  )}
                  <h1 className="text-2xl font-bold">Solana Splitwise</h1>
                </div>
                <div className="flex items-center space-x-4">
                  <ConnectWallet />
                  <button
                    onClick={() => setShowCreateGroup(true)}
                    className="bg-purple-600 text-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-purple-700 transition duration-300 flex items-center"
                  >
                    <PlusCircle size={20} className="mr-2" />
                    New Group
                  </button>
                </div>
              </div>
            </header>
            <main className="flex-grow flex">
              {groups.length > 0 && (
                <aside
                  className={`w-64 bg-gray-800 p-4 border-r border-gray-700 transform ${
                    showSidebar ? 'translate-x-0' : '-translate-x-full'
                  } lg:translate-x-0 transition-transform duration-300 ease-in-out fixed lg:static h-full z-30 overflow-y-auto`}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-100">
                      Groups
                    </h2>
                  </div>
                  <GroupList
                    groups={groups}
                    onSelectGroup={(group) => {
                      setSelectedGroup(group);
                      setShowSidebar(false);
                    }}
                  />
                </aside>
              )}
              <section
                className={`flex-grow p-6 ${
                  groups.length > 0 ? 'lg:ml-64' : ''
                } overflow-y-auto`}
              >
                <div className="max-w-4xl mx-auto">
                  {groups.length === 0 ? (
                    <EmptyState
                      onCreateGroup={() => setShowCreateGroup(true)}
                    />
                  ) : selectedGroup ? (
                    <div className="bg-gray-800 rounded-lg shadow-md p-6 space-y-8">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                        <h2 className="text-3xl font-bold text-gray-100 mb-4 md:mb-0">
                          {selectedGroup.name}
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => setShowAddExpense(true)}
                            className="bg-green-600 text-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 flex items-center"
                          >
                            <DollarSign size={20} className="mr-2" />
                            Add Expense
                          </button>
                          <button
                            onClick={() => setShowGroupManagement(true)}
                            className="bg-blue-600 text-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
                          >
                            <UserCog size={20} className="mr-2" />
                            Manage Group
                          </button>
                          <button
                            onClick={() => setShowSettlePayment(true)}
                            className="bg-yellow-600 text-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-yellow-700 transition duration-300 flex items-center"
                          >
                            <CreditCard size={20} className="mr-2" />
                            Settle Payment
                          </button>
                          <button
                            onClick={handleDeleteGroup}
                            className="bg-red-600 text-gray-100 px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition duration-300 flex items-center"
                          >
                            <Trash2 size={20} className="mr-2" />
                            Delete Group
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-6 space-y-6">
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-gray-300">
                            Members
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedGroup.members.map((member, index) => (
                              <span
                                key={index}
                                className="bg-gray-600 text-gray-100 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-4 text-gray-300">
                            Expenses
                          </h3>
                          {selectedGroup.expenses.length > 0 ? (
                            <ul className="space-y-4">
                              {selectedGroup.expenses.map((expense, index) => (
                                <li
                                  key={index}
                                  className="bg-gray-600 p-4 rounded-lg shadow"
                                >
                                  <div className="flex justify-between items-center">
                                    <span className="font-medium text-gray-100">
                                      {expense.description}
                                    </span>
                                    <span className="font-semibold text-green-400">
                                      ${expense.amount.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="text-sm text-gray-400 mt-1">
                                    Paid by: {expense.paidBy}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500 italic">
                              No expenses yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-xl text-gray-500">
                        Select a group or create a new one to get started
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </main>
            {showCreateGroup && (
              <CreateGroup
                onClose={() => setShowCreateGroup(false)}
                onCreateGroup={handleCreateGroup}
              />
            )}
            {showAddExpense && selectedGroup && (
              <AddExpense
                group={selectedGroup}
                onClose={() => setShowAddExpense(false)}
                onAddExpense={handleAddExpense}
              />
            )}
            {showGroupManagement && selectedGroup && (
              <GroupManagement
                group={selectedGroup}
                onClose={() => setShowGroupManagement(false)}
                onUpdateGroup={handleUpdateGroup}
              />
            )}
            {showSettlePayment && selectedGroup && (
              <SettlePayment
                group={selectedGroup}
                onClose={() => setShowSettlePayment(false)}
                onSettlePayment={(from, to, amount) => {
                  console.log(`Settle payment: ${from} pays ${to} $${amount}`);
                  setShowSettlePayment(false);
                }}
              />
            )}
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
