import React from 'react';
import { cn } from '../utils/cn';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { ROLES } from '../data';
import Tooltip from './ui/Tooltip';

export default function ResourceTimeline({ resource, bookings }) {
  const { currentUser } = useAuth();
  const { getBookingDisplayInfo } = usePermissions();
  const hours = Array.from({ length: 15 }, (_, i) => i + 7); // 07:00 to 21:00
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  const getPosition = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const totalMinutes = (hour - 7) * 60 + minutes;
    const totalPossibleMinutes = 14 * 60; 
    return (totalMinutes / totalPossibleMinutes) * 100;
  };

  const getDuration = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    const diff = (e - s) / (1000 * 60);
    const totalPossibleMinutes = 14 * 60;
    return (diff / totalPossibleMinutes) * 100;
  };

  const isAdmin = currentUser.role === ROLES.ADMIN;

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
        <h3 className="font-bold text-zinc-900">Availability Timeline</h3>
        {isAdmin && (
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-brand-500" /> Approved</div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded bg-amber-400" /> Pending</div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[800px] p-6">
          <div className="flex mb-4">
            <div className="w-24 shrink-0" />
            <div className="flex-1 flex justify-between px-2">
              {hours.map(h => (
                <span key={h} className="text-[10px] font-bold text-zinc-400">{h}:00</span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {days.map((day, dayIdx) => (
              <div key={day} className="flex items-center">
                <div className="w-24 shrink-0 text-xs font-bold text-zinc-500">{day}</div>
                <div className="flex-1 h-12 bg-zinc-100/50 rounded-lg relative border border-zinc-100 overflow-hidden">
                  {hours.map((_, i) => (
                    <div 
                      key={i} 
                      className="absolute top-0 bottom-0 border-l border-zinc-200/50" 
                      style={{ left: `${(i / 14) * 100}%` }} 
                    />
                  ))}
                  
                  {bookings.filter(b => {
                    const d = new Date(b.startDateTime);
                    return d.getDay() === (dayIdx + 1); 
                  }).map(b => {
                    const info = getBookingDisplayInfo(b);
                    const blockContent = (
                      <div 
                        key={b.id}
                        className={cn(
                          "absolute top-1 bottom-1 rounded-md px-2 py-1 text-[9px] font-bold overflow-hidden shadow-sm flex flex-col justify-center transition-all",
                          !isAdmin 
                            ? "bg-zinc-300 text-zinc-600" 
                            : (b.status === 'APPROVED' ? "bg-brand-500 text-white" : "bg-amber-400 text-white")
                        )}
                        style={{ 
                          left: `${getPosition(b.startDateTime)}%`, 
                          width: `${getDuration(b.startDateTime, b.endDateTime)}%` 
                        }}
                      >
                        <span className="truncate">{info.label}</span>
                      </div>
                    );

                    return (
                      <Tooltip 
                        key={b.id}
                        content={info.showDetails ? `${b.purpose} • ${b.userName} (${b.status})` : "This slot is unavailable"}
                      >
                        {blockContent}
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
