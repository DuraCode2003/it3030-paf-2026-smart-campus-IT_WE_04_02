import React from 'react';
import { cn } from '../../utils/cn';

const STATUS_COLOR_MAP = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  OUT_OF_SERVICE: 'bg-red-100 text-red-700 ring-red-200',
  PENDING: 'bg-amber-100 text-amber-700 ring-amber-200',
  APPROVED: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  REJECTED: 'bg-red-100 text-red-700 ring-red-200',
  CANCELLED: 'bg-zinc-100 text-zinc-700 ring-zinc-200',
  OPEN: 'bg-blue-100 text-blue-700 ring-blue-200',
  IN_PROGRESS: 'bg-violet-100 text-violet-700 ring-violet-200',
  RESOLVED: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  CLOSED: 'bg-zinc-100 text-zinc-700 ring-zinc-200',
  LOW: 'bg-zinc-100 text-zinc-700 ring-zinc-200',
  MEDIUM: 'bg-amber-100 text-amber-700 ring-amber-200',
  HIGH: 'bg-orange-100 text-orange-700 ring-orange-200',
  CRITICAL: 'bg-red-100 text-red-700 ring-red-200',
  STUDENT: 'bg-blue-100 text-blue-700 ring-blue-200',
  LECTURER: 'bg-indigo-100 text-indigo-700 ring-indigo-200',
  ADMIN: 'bg-violet-100 text-violet-700 ring-violet-200',
  TECHNICIAN: 'bg-teal-100 text-teal-700 ring-teal-200',
};

export default function Badge({ status, children, className }) {
  const colorClass = STATUS_COLOR_MAP[status] || 'bg-zinc-100 text-zinc-700 ring-zinc-200';
  
  return (
    <span className={cn(
      "badge ring-1",
      colorClass,
      className
    )}>
      {children || status}
    </span>
  );
}
