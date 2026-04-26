import React from 'react';
import { cn } from '../../utils/cn';

export default function Textarea({ 
  label, 
  error, 
  rows = 3, 
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
      <textarea
        rows={rows}
        className={cn(
          "input min-h-[80px] resize-none",
          error && "border-red-500 focus:ring-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
}
