import React from 'react';
import { cn } from '../../utils/cn';

export default function StatCard({ title, value, subtitle, icon: Icon, colorClass, iconColorClass }) {
  return (
    <div className="card p-5 group hover:border-zinc-300 transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl font-black text-zinc-900">{value}</h3>
          {subtitle && (
            <p className="text-[10px] font-bold text-zinc-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
          colorClass || "bg-zinc-100 shadow-zinc-500/10"
        )}>
          <Icon className={cn("w-5 h-5", iconColorClass || "text-zinc-500")} />
        </div>
      </div>
    </div>
  );
}
