import React from 'react';
import { Home, Play, Plus, Search, User } from 'lucide-react';

const BottomNavigation: React.FC = () => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Play, label: 'Shorts', active: false },
    { icon: Plus, label: 'Add', active: false },
    { icon: Search, label: 'Search', active: false },
    { icon: User, label: 'Profile', active: false }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? 'text-purple-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.label === 'Add' ? (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <Icon className="w-6 h-6" />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;