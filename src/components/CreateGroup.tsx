import React, { useState } from 'react';
import { X, UserPlus } from 'lucide-react';
import { Group } from '../types';

interface CreateGroupProps {
  onClose: () => void;
  onCreateGroup: (group: Group) => void;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState<string[]>(['']);

  const handleAddMember = () => {
    setMembers([...members, '']);
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGroup: Group = {
      id: Date.now().toString(),
      name: groupName,
      members: members.filter(member => member.trim() !== ''),
      expenses: [],
    };
    onCreateGroup(newGroup);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Create New Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition duration-300">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="groupName" className="block mb-2 font-semibold text-gray-300">
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-300">Members</label>
            {members.map((member, index) => (
              <input
                key={index}
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg mb-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                placeholder={`Member ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={handleAddMember}
              className="text-purple-400 hover:text-purple-300 font-medium flex items-center transition duration-300"
            >
              <UserPlus size={20} className="mr-2" />
              Add Member
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-gray-100 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;