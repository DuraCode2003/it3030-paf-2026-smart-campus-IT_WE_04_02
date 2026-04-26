import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  AlertTriangle, 
  Search, 
  Filter,
  MoreVertical,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import KanbanCard from '../components/KanbanCard';
import { TICKETS, CURRENT_USER } from '../data';
import { cn } from '../utils/cn';

export default function TicketsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState('kanban');
  const [activeTab, setActiveTab] = useState('all');
  
  const columns = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  const filteredTickets = TICKETS.filter(t => {
    if (activeTab === 'my') return t.reportedById === CURRENT_USER.id;
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Tickets', count: TICKETS.length },
    { id: 'my', label: 'My Tickets', count: TICKETS.filter(t => t.reportedById === CURRENT_USER.id).length },
  ];

  return (
    <div className="animate-fade-in flex flex-col h-full">
      <PageHeader 
        title="Incident Ticketing" 
        subtitle="Manage campus maintenance and technical support requests."
        actions={
          <div className="flex items-center gap-3">
            <div className="flex bg-white border border-zinc-200 rounded-lg p-1">
              <button 
                onClick={() => setView('kanban')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === 'kanban' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setView('list')}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  view === 'list' ? "bg-zinc-100 text-zinc-900" : "text-zinc-400 hover:text-zinc-600"
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <Button onClick={() => navigate('/tickets/new')} icon={Plus}>
              New Ticket
            </Button>
          </div>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {view === 'kanban' ? (
        <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar min-h-[600px]">
          {columns.map(col => {
            const columnTickets = filteredTickets.filter(t => t.status === col);
            return (
              <div key={col} className="w-80 shrink-0 flex flex-col">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">{col.replace('_', ' ')}</h3>
                    <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] font-bold rounded-full">
                      {columnTickets.length}
                    </span>
                  </div>
                  <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 bg-zinc-100/50 rounded-2xl p-2.5 space-y-3 overflow-y-auto custom-scrollbar border border-zinc-100/50">
                  {columnTickets.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 text-center">
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">No tickets</p>
                    </div>
                  ) : (
                    columnTickets.map(ticket => (
                      <KanbanCard 
                        key={ticket.id} 
                        ticket={ticket} 
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      />
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-100">
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredTickets.map((ticket) => (
                <tr 
                  key={ticket.id} 
                  className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                >
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{ticket.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={ticket.category} className="bg-zinc-100 text-zinc-600" />
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-900 font-medium line-clamp-1 max-w-[300px]">{ticket.description}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                       <div className={cn(
                         "w-1.5 h-1.5 rounded-full",
                         ticket.priority === 'CRITICAL' ? "bg-red-500" : 
                         ticket.priority === 'HIGH' ? "bg-orange-500" :
                         ticket.priority === 'MEDIUM' ? "bg-amber-500" : "bg-zinc-400"
                       )} />
                       <span className="text-xs font-bold text-zinc-600">{ticket.priority}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge status={ticket.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-zinc-400 group-hover:text-zinc-900">
                       <ChevronRight className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
