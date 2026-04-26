import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Check, Bell, MessageSquare, Ticket, Calendar, Circle } from 'lucide-react';
import { cn } from '../../utils/cn';
import { NOTIFICATIONS } from '../../data';
import Button from '../ui/Button';

const ICON_MAP = {
  BOOKING_APPROVED: { icon: Calendar, color: 'text-emerald-500 bg-emerald-50' },
  BOOKING_REJECTED: { icon: Calendar, color: 'text-red-500 bg-red-50' },
  TICKET_STATUS_CHANGED: { icon: Ticket, color: 'text-violet-500 bg-violet-50' },
  NEW_COMMENT: { icon: MessageSquare, color: 'text-blue-500 bg-blue-50' },
};

export default function NotificationPanel({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-modal border border-zinc-100 z-50 overflow-hidden animate-slide-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-50 bg-zinc-50/50">
        <h3 className="font-bold text-sm">Notifications</h3>
        <button className="text-xs font-semibold text-brand-600 hover:text-brand-700">
          Mark all read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto custom-scrollbar">
        {NOTIFICATIONS.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-8 h-8 text-zinc-200 mx-auto mb-2" />
            <p className="text-sm text-zinc-500">All caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-zinc-50">
            {NOTIFICATIONS.map((item) => {
              const config = ICON_MAP[item.type] || { icon: Circle, color: 'text-zinc-500 bg-zinc-50' };
              const Icon = config.icon;

              return (
                <div 
                  key={item.id} 
                  className={cn(
                    "p-4 hover:bg-zinc-50 cursor-pointer transition-colors group",
                    !item.isRead && "bg-brand-50/30"
                  )}
                >
                  <div className="flex gap-3">
                    <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", config.color)}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p className="text-sm font-bold text-zinc-900 truncate">{item.title}</p>
                        {!item.isRead && <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />}
                      </div>
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-2">
                        {item.message}
                      </p>
                      <p className="text-[10px] font-medium text-zinc-400">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-2 border-t border-zinc-50 bg-zinc-50/30">
        <Button variant="ghost" size="sm" className="w-full justify-center text-zinc-500">
          View all activity
        </Button>
      </div>
    </div>
  );
}
