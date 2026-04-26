import React from 'react';
import { cn } from '../../utils/cn';

export default function Tooltip({ content, children, position = 'top' }) {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="group relative inline-block">
      {children}
      <div className={cn(
        "absolute z-[60] scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-150 pointer-events-none",
        positions[position]
      )}>
        <div className="px-2 py-1 bg-zinc-900 text-white text-[10px] font-medium rounded shadow-lg whitespace-nowrap">
          {content}
        </div>
      </div>
    </div>
  );
}
