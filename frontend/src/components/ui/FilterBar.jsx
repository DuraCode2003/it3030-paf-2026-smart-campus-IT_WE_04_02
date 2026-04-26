import React from 'react';
import { Search } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FilterBar({ filters, values, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {filters.map((filter) => {
        if (filter.type === 'search') {
          return (
            <div key={filter.key} className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder={filter.label}
                value={values[filter.key] || ''}
                onChange={(e) => onChange(filter.key, e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
              />
            </div>
          );
        }

        if (filter.type === 'select') {
          return (
            <select
              key={filter.key}
              value={values[filter.key] || ''}
              onChange={(e) => onChange(filter.key, e.target.value)}
              className="px-3 py-1.5 text-sm bg-white border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent cursor-pointer"
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          );
        }

        return null;
      })}
    </div>
  );
}
