import React, { useState } from 'react';
import { 
  ClipboardList, 
  AlertTriangle, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  User, 
  MessageSquare,
  Clock,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, isWithinInterval, subDays } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { TICKETS, ROLES } from '../../data';
import Tabs from '../../components/ui/Tabs';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import KanbanCard from '../../components/KanbanCard';
import { cn } from '../../utils/cn';

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const myTickets = TICKETS.filter(t => t.assignedToId === currentUser.id);
  const criticalTickets = myTickets.filter(t => t.priority === 'CRITICAL');
  const inProgressTickets = myTickets.filter(t => t.status === 'IN_PROGRESS');
  
  // Mock resolved this week (last 7 days)
  const today = new Date('2026-04-26');
  const lastWeek = subDays(today, 7);
  const resolvedThisWeek = myTickets.filter(t => 
    t.status === 'RESOLVED' && 
    new Date(t.updatedAt) >= lastWeek
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'assigned', label: 'Assigned to Me', count: myTickets.filter(t => t.status !== 'CLOSED').length },
    { id: 'in-progress', label: 'In Progress', count: inProgressTickets.length },
    { id: 'resolved', label: 'Resolved', count: resolvedThisWeek.length },
  ];

  // Priority Queue sorting
  const priorityQueue = [...myTickets]
    .filter(t => t.status !== 'RESOLVED' && t.status !== 'CLOSED')
    .sort((a, b) => {
      const priorityMap = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      return priorityMap[a.priority] - priorityMap[b.priority];
    });

  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Assigned" value={myTickets.length} icon={ClipboardList} colorClass="bg-brand-50" iconColorClass="text-brand-600" />
            <StatCard title="Critical" value={criticalTickets.length} icon={AlertTriangle} colorClass="bg-red-50" iconColorClass="text-red-600" />
            <StatCard title="In Progress" value={inProgressTickets.length} icon={Wrench} colorClass="bg-violet-50" iconColorClass="text-violet-600" />
            <StatCard title="Resolved This Week" value={resolvedThisWeek.length} icon={CheckCircle2} colorClass="bg-emerald-50" iconColorClass="text-emerald-600" />
          </div>

          <div className="space-y-4">
             <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest px-2">Priority Queue</h3>
             <div className="card divide-y divide-zinc-100">
                {priorityQueue.length === 0 ? (
                  <div className="p-8 text-center text-zinc-400 font-bold uppercase tracking-widest text-xs">No active tickets in queue</div>
                ) : (
                  priorityQueue.map(ticket => (
                    <div key={ticket.id} className="p-4 flex items-center justify-between hover:bg-zinc-50 transition-colors">
                       <div className="flex items-center gap-6 flex-1">
                          <div className={cn(
                            "w-12 h-12 rounded-full border-4 flex items-center justify-center shrink-0",
                            ticket.priority === 'CRITICAL' ? "border-red-100 text-red-500" :
                            ticket.priority === 'HIGH' ? "border-orange-100 text-orange-500" : "border-zinc-100 text-zinc-400"
                          )}>
                             <span className="text-[10px] font-black">{ticket.priority.charAt(0)}</span>
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{ticket.description}</h4>
                             <div className="flex items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {ticket.location}</span>
                                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {ticket.reportedByName}</span>
                                <span className="text-red-400">{Math.floor((today - new Date(ticket.createdAt)) / (1000 * 60 * 60 * 24))} days open</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-3">
                          {ticket.status === 'OPEN' ? (
                            <Button size="sm" className="bg-brand-600">Start Working</Button>
                          ) : (
                            <Button variant="secondary" size="sm" onClick={() => navigate(`/tickets/${ticket.id}`)}>Update</Button>
                          )}
                          <button className="p-2 text-zinc-400 hover:text-zinc-900"><MoreVertical className="w-4 h-4" /></button>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'assigned' && (
        <div className="flex gap-6 overflow-x-auto pb-6 min-h-[500px]">
          {['OPEN', 'IN_PROGRESS', 'RESOLVED'].map(status => {
            const columnTickets = myTickets.filter(t => t.status === status);
            return (
              <div key={status} className="w-80 shrink-0 flex flex-col gap-4">
                 <div className="flex items-center justify-between px-2">
                    <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest">{status.replace('_', ' ')}</h4>
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-[10px] font-black rounded-full">{columnTickets.length}</span>
                 </div>
                 <div className="flex-1 bg-zinc-100/50 rounded-2xl p-2.5 space-y-3 border border-zinc-100/50">
                    {columnTickets.length === 0 ? (
                      <div className="h-32 flex items-center justify-center text-[10px] font-black text-zinc-300 uppercase tracking-widest">Empty</div>
                    ) : (
                      columnTickets.map(t => (
                        <KanbanCard key={t.id} ticket={t} onClick={() => navigate(`/tickets/${t.id}`)} />
                      ))
                    )}
                 </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'in-progress' && (
        <div className="space-y-6">
           {inProgressTickets.length === 0 ? (
             <EmptyState icon={Wrench} title="No tickets in progress" description="Pick a ticket from your queue to start working." />
           ) : (
             <div className="grid grid-cols-1 gap-6">
               {inProgressTickets.map(t => (
                 <div key={t.id} className="card p-6 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                       <div className="flex items-center gap-3">
                          <Badge status={t.priority} />
                          <Badge status={t.category} className="bg-zinc-100 text-zinc-500" />
                          <span className="text-[10px] font-black text-zinc-400 ml-auto">{t.id}</span>
                       </div>
                       <h4 className="text-xl font-black text-zinc-900 leading-tight">{t.description}</h4>
                       <div className="flex flex-wrap gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {t.location}</span>
                          <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> Computer Lab 02</span>
                          <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {t.reportedByName}</span>
                          <span className="flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5" /> {t.comments?.length || 0} Comments</span>
                       </div>
                       <p className="text-xs text-violet-600 font-bold">Working on this for {Math.floor((today - new Date(t.updatedAt)) / (1000 * 60 * 60 * 24))} days</p>
                    </div>
                    <div className="md:w-72 space-y-4 border-l border-zinc-100 pl-8">
                       <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Resolution Notes</p>
                       <textarea 
                         placeholder="Describe how the issue was resolved..." 
                         className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none h-24 resize-none"
                       />
                       <Button className="w-full justify-center bg-emerald-600 hover:bg-emerald-700">Mark Resolved</Button>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      )}

      {activeTab === 'resolved' && (
         <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
               <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Resolution History</h3>
               <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] font-black uppercase text-zinc-500 hover:bg-zinc-50 transition-colors">This Week</button>
                  <button className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] font-black uppercase text-zinc-400 hover:bg-zinc-50 transition-colors">All Time</button>
               </div>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-zinc-50/30 border-b border-zinc-100">
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Priority</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resolved Date</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Notes</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {resolvedThisWeek.map(t => (
                        <tr key={t.id} className="hover:bg-zinc-50 transition-colors">
                           <td className="px-6 py-4 font-bold text-sm text-zinc-900">{t.description}</td>
                           <td className="px-6 py-4"><Badge status={t.priority} /></td>
                           <td className="px-6 py-4 text-xs font-medium text-zinc-500">{format(new Date(t.updatedAt), 'dd MMM yyyy')}</td>
                           <td className="px-6 py-4 text-xs text-zinc-400 italic truncate max-w-[200px]">Problem fixed. Replacement part installed.</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}
    </div>
  );
}
