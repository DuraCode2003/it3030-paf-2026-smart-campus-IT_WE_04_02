import React from 'react';
import { cn } from '../../utils/cn';

export default function Input({ 
  label, 
  error, 
  hint, 
  icon: Icon, 
  required, 
  className,
  ...props 
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-sm font-medium text-zinc-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          className={cn(
            "input",
            Icon && "pl-9",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
      </div>
      {hint && !error && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
