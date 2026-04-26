import React from 'react';
import { cn } from '../../utils/cn';

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex items-center gap-6 border-b border-zinc-200 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            "relative pb-3 text-sm font-medium transition-colors",
            activeTab === tab.id 
              ? "text-brand-600" 
              : "text-zinc-500 hover:text-zinc-900"
          )}
        >
          <span className="flex items-center gap-2">
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "px-1.5 py-0.5 text-[10px] rounded-md font-bold",
                activeTab === tab.id 
                  ? "bg-brand-50 text-brand-700" 
                  : "bg-zinc-100 text-zinc-500"
              )}>
                {tab.count}
              </span>
            )}
          </span>
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
