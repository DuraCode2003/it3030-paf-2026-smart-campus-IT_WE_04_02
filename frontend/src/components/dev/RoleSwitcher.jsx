import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../data';
import { cn } from '../../utils/cn';

export default function RoleSwitcher() {
  const { currentUser, switchRole } = useAuth();

  // Only render in development
  if (!import.meta.env.DEV) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-zinc-900 text-white rounded-2xl shadow-xl px-4 py-3 border border-zinc-800">
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Dev: Role Switcher</p>
        
        <div className="flex items-center gap-1">
          {Object.values(ROLES).map((role) => (
            <button
              key={role}
              onClick={() => switchRole(role)}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all",
                currentUser.role === role
                  ? "bg-brand-600 text-white shadow-lg shadow-brand-900/20"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="mt-2 pt-2 border-t border-zinc-800/50">
          <p className="text-[10px] text-zinc-500 font-medium truncate max-w-[200px]">
            Logged in as: <span className="text-zinc-300 font-bold">{currentUser.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
