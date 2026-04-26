import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Plus, 
  Search, 
  Filter,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import EmptyState from '../components/ui/EmptyState';
import KanbanCard from '../components/KanbanCard';
import FilterBar from '../components/ui/FilterBar';
import { TICKETS, ROLES } from '../data';
import { cn } from '../utils/cn';
import { useAuth } from '../hooks/useAuth';

export default function TicketsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const isStudentOrLecturer = currentUser.role === ROLES.STUDENT || currentUser.role === ROLES.LECTURER;
  const isAdmin = currentUser.role === ROLES.ADMIN;
  const isTechnician = currentUser.role === ROLES.TECHNICIAN;

  const [view, setView] = useState(isTechnician ? 'kanban' : 'list');
  const [activeTab, setActiveTab] = useState('all');

  const myTickets = TICKETS.filter(t => {
    if (isTechnician) return t.assignedToId === currentUser.id;
    return t.reportedById === currentUser.id;
  });

  const displayTickets = isAdmin ? TICKETS : myTickets;

  const columns = isTechnician 
    ? ['OPEN', 'IN_PROGRESS', 'RESOLVED'] 
    : ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];

  const tabs = [];
  if (isAdmin) {
    tabs.push({ id: 'all', label: 'All Tickets', count: TICKETS.length });
    tabs.push({ id: 'my', label: 'My Reports', count: TICKETS.filter(t => t.reportedById === currentUser.id).length });
  }

  return (
    <div className="animate-fade-in flex flex-col h-full space-y-6">
      <PageHeader 
        title="Incident Ticketing" 
        subtitle="Manage campus maintenance and technical support requests."
        actions={
          <div className="flex items-center gap-3">
            {isAdmin && (
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
            )}
            {!isTechnician && (
              <Button onClick={() => navigate('/tickets/new')} icon={Plus}>
                New Ticket
              </Button>
            )}
          </div>
        }
      />

      {tabs.length > 0 && <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />}

      {isAdmin && <FilterBar filters={['Status', 'Priority', 'Category', 'Assignee']} />}

      {view === 'kanban' ? (
        <div className="flex-1 flex gap-6 overflow-x-auto pb-6 custom-scrollbar min-h-[500px]">
          {columns.map(col => {
            const columnTickets = displayTickets.filter(t => t.status === col);
            return (
              <div key={col} className="w-80 shrink-0 flex flex-col">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest">{col.replace('_', ' ')}</h3>
                    <span className="px-1.5 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] font-bold rounded-full">
                      {columnTickets.length}
                    </span>
                  </div>
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
              {displayTickets.length === 0 ? (
                <tr>
                   <td colSpan="6" className="px-6 py-12 text-center text-zinc-500 font-medium italic">No tickets found.</td>
                </tr>
              ) : (
                displayTickets.map((ticket) => (
                  <tr 
                    key={ticket.id} 
                    className="hover:bg-zinc-50/50 transition-colors group cursor-pointer"
                    onClick={() => navigate(`/tickets/${ticket.id}`)}
                  >
                    <td className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">{ticket.id}</td>
                    <td className="px-6 py-4"><Badge status={ticket.category} className="bg-zinc-100 text-zinc-600" /></td>
                    <td className="px-6 py-4"><p className="text-sm text-zinc-900 font-medium line-clamp-1 max-w-[300px]">{ticket.description}</p></td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", ticket.priority === 'CRITICAL' ? "bg-red-500" : ticket.priority === 'HIGH' ? "bg-orange-500" : "bg-amber-500")} />
                        <span className="text-xs font-bold text-zinc-600">{ticket.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge status={ticket.status} /></td>
                    <td className="px-6 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-zinc-400 ml-auto" />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
