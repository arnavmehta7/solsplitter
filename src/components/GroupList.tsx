import React from 'react';
import { Users } from 'lucide-react';
import { Group } from '../types';

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (group: Group) => void;
}

const GroupList: React.FC<GroupListProps> = ({ groups, onSelectGroup }) => {
  return (
    <ul className="space-y-2">
      {groups.map((group) => (
        <li
          key={group.id}
          onClick={() => onSelectGroup(group)}
          className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-300"
        >
          <div className="bg-purple-600 p-2 rounded-full mr-3">
            <Users size={20} className="text-gray-100" />
          </div>
          <span className="font-medium text-gray-100">{group.name}</span>
        </li>
      ))}
    </ul>
  );
};

export default GroupList;