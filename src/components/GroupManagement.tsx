import React, { useState } from 'react';
import { X, UserPlus, UserMinus } from 'lucide-react';
import { Group } from '../types';

interface GroupManagementProps {
  group: Group;
  onClose: () => void;
  onUpdateGroup: (updatedGroup: Group) => void;
}

const GroupManagement: React.FC<GroupManagementProps> = ({ group, onClose, onUpdateGroup }) => {
  const [members, setMembers] = useState<string[]>(group.members);
  const [newMember, setNewMember] = useState('');

  const handleAddMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers([...members, newMember]);
      setNewMember('');
    }
  };

  const handleRemoveMember = (memberToRemove: string) => {
    setMembers(members.filter(member => member !== memberToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedGroup: Group = {
      ...group,
      members: members,
    };
    onUpdateGroup(updatedGroup);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Manage Group</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition duration-300">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-300">Members</label>
            <ul className="space-y-2 mb-4">
              {members.map((member, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-lg">
                  <span>{member}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member)}
                    className="text-red-400 hover:text-red-300 transition duration-300"
                  >
                    <UserMinus size={20} />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex">
              <input
                type="text"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
                className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-100"
                placeholder="New member name"
              />
              <button
                type="button"
                onClick={handleAddMember}
                className="bg-purple-600 text-gray-100 px-4 py-2 rounded-r-lg font-semibold hover:bg-purple-700 transition duration-300"
              >
                <UserPlus size={20} />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-gray-100 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Update Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default GroupManagement;