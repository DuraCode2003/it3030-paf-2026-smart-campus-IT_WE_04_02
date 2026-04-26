import React from 'react';
import { cn } from '../../utils/cn';

export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}) {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-zinc-200",
      className
    )}>
      <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4">
        {Icon && <Icon className="w-8 h-8 text-zinc-300" />}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm text-zinc-500 max-w-[280px]">
        {description}
      </p>
      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}
