import React from 'react';
import { cn } from '../../utils/cn';

export default function Avatar({ name, initials, size = 'md', imageUrl }) {
  const sizes = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  const getColorFromName = (name) => {
    if (!name) return 'bg-zinc-100';
    const char = name.charAt(0).toUpperCase();
    const colors = [
      'bg-brand-100 text-brand-700',
      'bg-emerald-100 text-emerald-700',
      'bg-blue-100 text-blue-700',
      'bg-violet-100 text-violet-700',
      'bg-orange-100 text-orange-700',
      'bg-amber-100 text-amber-700',
    ];
    const index = char.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className={cn(
      "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0",
      sizes[size],
      !imageUrl && getColorFromName(name || initials)
    )}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold">{initials || (name ? name.charAt(0) : '?')}</span>
      )}
    </div>
  );
}
