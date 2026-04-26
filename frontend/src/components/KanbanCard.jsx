import React from 'react';
import { MapPin, MessageSquare, Paperclip } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '../utils/cn';
import Avatar from './ui/Avatar';
import Tooltip from './ui/Tooltip';
import Badge from './ui/Badge';

const PRIORITY_COLORS = {
  LOW: 'border-zinc-300',
  MEDIUM: 'border-amber-500',
  HIGH: 'border-orange-500',
  CRITICAL: 'border-red-500',
};

export default function KanbanCard({ ticket, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "bg-white rounded-xl p-3.5 shadow-card mb-3 cursor-pointer hover:shadow-card-hover transition-all duration-200 border-l-[3px]",
        PRIORITY_COLORS[ticket.priority]
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
           <div className={cn(
             "w-1.5 h-1.5 rounded-full",
             ticket.priority === 'CRITICAL' ? "bg-red-500" : 
             ticket.priority === 'HIGH' ? "bg-orange-500" :
             ticket.priority === 'MEDIUM' ? "bg-amber-500" : "bg-zinc-400"
           )} />
           <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{ticket.id}</span>
        </div>
        <Badge status={ticket.category} className="text-[9px] px-1.5 py-0" />
      </div>

      <h4 className="text-sm font-bold text-zinc-900 line-clamp-2 leading-snug mb-3">
        {ticket.description}
      </h4>

      <div className="flex items-center gap-1.5 text-zinc-500 mb-4">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="text-[10px] font-medium truncate">{ticket.location}</span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
        <div className="flex items-center gap-2">
           <Avatar initials={ticket.reportedByName.charAt(0)} size="sm" />
           <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-900 leading-none mb-0.5">{ticket.reportedByName}</span>
              <span className="text-[9px] text-zinc-400 font-medium">
                {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
              </span>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
           {ticket.comments?.length > 0 && (
             <div className="flex items-center gap-1 text-zinc-400">
                <MessageSquare className="w-3 h-3" />
                <span className="text-[10px] font-bold">{ticket.comments.length}</span>
             </div>
           )}
           {ticket.assignedToId && (
             <Tooltip content={`Assigned to ${ticket.assignedToName}`}>
                <Avatar initials={ticket.assignedToName.charAt(0)} size="sm" className="ring-2 ring-white" />
             </Tooltip>
           )}
        </div>
      </div>
    </div>
  );
}
