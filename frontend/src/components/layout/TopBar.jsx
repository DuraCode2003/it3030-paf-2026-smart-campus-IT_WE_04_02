import React, { useState } from 'react';
import { Bell, Search, Command } from 'lucide-react';
import Avatar from '../ui/Avatar';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../data';
import NotificationPanel from './NotificationPanel';
import { cn } from '../../utils/cn';

export default function TopBar({ title }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { currentUser } = useAuth();
  const unreadCount = 3; 

  const getGreeting = () => {
    if (currentUser.role === ROLES.STUDENT) {
      const firstName = currentUser.name.split(' ')[0];
      return `Hi, ${firstName} 👋`;
    }
    if (currentUser.role === ROLES.LECTURER) {
      return currentUser.name; // Names already include Dr./Prof. in our mock data
    }
    if (currentUser.role === ROLES.ADMIN) {
      return "Admin Panel";
    }
    if (currentUser.role === ROLES.TECHNICIAN) {
      return "Technician Portal";
    }
    return "Operations Hub";
  };

  return (
    <header className="h-16 bg-white border-b border-zinc-100 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm shadow-zinc-100/50">
      <div className="flex items-center gap-6">
        <h2 className="text-sm font-black text-zinc-900 tracking-widest uppercase italic">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Decorative Search */}
        <div className="hidden sm:flex items-center gap-2.5 px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-400 hover:border-zinc-200 transition-all cursor-pointer group">
          <Search className="w-3.5 h-3.5 group-hover:text-zinc-600 transition-colors" />
          <span className="text-xs font-bold tracking-tight">Quick Search...</span>
          <div className="flex items-center gap-0.5 ml-4">
             <Command className="w-2.5 h-2.5" />
             <span className="text-[10px] font-black">K</span>
          </div>
        </div>

        <div className="h-6 w-[1px] bg-zinc-100 mx-1" />

        {/* Right Section */}
        <div className="flex items-center gap-5">
           {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-xl transition-all relative group"
            >
              <Bell className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>
            <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
          </div>

          {/* Role Info & Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-100">
             <div className="flex flex-col items-end">
                <span className="text-xs font-black text-zinc-900 leading-tight">{getGreeting()}</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-1">{currentUser.role}</span>
             </div>
             <Avatar name={currentUser.name} initials={currentUser.initials} size="md" className="ring-2 ring-zinc-50 shadow-sm" />
          </div>
        </div>
      </div>
    </header>
  );
}
