
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Mic, User, AlertTriangle } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: Mic, label: 'Voice', path: '/voice' },
    { icon: AlertTriangle, label: 'SOS', path: '/sos' },
    { icon: User, label: 'Profile', path: '/profile' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-pink-500 bg-pink-50' 
                  : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'animate-pulse' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;
