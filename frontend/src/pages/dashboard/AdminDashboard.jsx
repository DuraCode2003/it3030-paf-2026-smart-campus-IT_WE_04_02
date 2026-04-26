import React, { useState } from 'react';
import { 
  Clock, 
  AlertTriangle, 
  Building2, 
  CalendarCheck, 
  Wrench, 
  Users, 
  CheckCircle2, 
  ChevronRight,
  Search,
  Filter,
  User,
  Plus,
  Mail,
  Shield,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { BOOKINGS, TICKETS, USERS as USERS_DATA, RESOURCES, STATS, ROLES } from '../../data';
import Tabs from '../../components/ui/Tabs';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Avatar from '../../components/ui/Avatar';
import FilterBar from '../../components/ui/FilterBar';
import { cn } from '../../utils/cn';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const pendingBookings = BOOKINGS.filter(b => b.status === 'PENDING');
  const unassignedTickets = TICKETS.filter(t => t.status === 'OPEN' && !t.assignedToId);
  const technicians = USERS_DATA.filter(u => u.role === ROLES.TECHNICIAN);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'approvals', label: 'Pending Approvals', count: pendingBookings.length },
    { id: 'unassigned', label: 'Unassigned Tickets', count: unassignedTickets.length },
    { id: 'all-bookings', label: 'All Bookings' },
    { id: 'all-tickets', label: 'All Tickets' },
    { id: 'users', label: 'Users' },
    { id: 'resources', label: 'Resources' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Pending Approvals" value={pendingBookings.length} icon={Clock} colorClass="bg-amber-50" iconColorClass="text-amber-600" />
            <StatCard title="Unassigned Tickets" value={unassignedTickets.length} icon={AlertTriangle} colorClass="bg-red-50" iconColorClass="text-red-600" />
            <StatCard title="Total Resources" value={RESOURCES.length} icon={Building2} colorClass="bg-brand-50" iconColorClass="text-brand-600" />
            <StatCard title="Active Bookings" value={BOOKINGS.filter(b => b.status === 'APPROVED').length} icon={CalendarCheck} colorClass="bg-emerald-50" iconColorClass="text-emerald-600" />
            <StatCard title="Open Tickets" value={TICKETS.filter(t => ['OPEN', 'IN_PROGRESS'].includes(t.status)).length} icon={Wrench} colorClass="bg-orange-50" iconColorClass="text-orange-600" />
            <StatCard title="Total Users" value={USERS_DATA.length} icon={Users} colorClass="bg-violet-50" iconColorClass="text-violet-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {/* Pending Approvals Panel */}
             <div className="card border-amber-200 overflow-hidden">
                <div className="px-6 py-4 bg-amber-50/50 border-b border-amber-100 flex items-center justify-between">
                   <h3 className="text-xs font-black text-amber-700 uppercase tracking-widest">Needs Your Approval</h3>
                   <span className="px-2 py-1 bg-amber-100 text-amber-700 text-[10px] font-black rounded-lg">{pendingBookings.length}</span>
                </div>
                <div className="divide-y divide-zinc-100 px-6">
                   {pendingBookings.slice(0, 3).map(b => (
                     <div key={b.id} className="py-4 flex items-center justify-between group">
                        <div className="space-y-1">
                           <p className="text-sm font-bold text-zinc-900">{b.userName} <span className="text-zinc-400 font-medium">for</span> {b.resourceName}</p>
                           <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{new Date(b.startDateTime).toLocaleDateString()} • {new Date(b.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50 font-black text-[10px] uppercase tracking-widest">Approve</Button>
                           <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50 font-black text-[10px] uppercase tracking-widest">Reject</Button>
                        </div>
                     </div>
                   ))}
                </div>
                <button onClick={() => setActiveTab('approvals')} className="w-full py-3 bg-zinc-50/50 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] hover:text-brand-600 transition-colors border-t border-zinc-100">
                   View all {pendingBookings.length} pending →
                </button>
             </div>

             {/* Unassigned Tickets Panel */}
             <div className="card border-red-200 overflow-hidden">
                <div className="px-6 py-4 bg-red-50/50 border-b border-red-100 flex items-center justify-between">
                   <h3 className="text-xs font-black text-red-700 uppercase tracking-widest">Unassigned Tickets</h3>
                   <span className="px-2 py-1 bg-red-100 text-red-700 text-[10px] font-black rounded-lg">{unassignedTickets.length}</span>
                </div>
                <div className="divide-y divide-zinc-100 px-6">
                   {unassignedTickets.slice(0, 3).map(t => (
                     <div key={t.id} className="py-4 flex items-center justify-between group">
                        <div className="space-y-1">
                           <div className="flex items-center gap-2">
                              <div className={cn("w-1.5 h-1.5 rounded-full", t.priority === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-500')} />
                              <p className="text-sm font-bold text-zinc-900 line-clamp-1">{t.description}</p>
                           </div>
                           <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">{t.location} • Reported by {t.reportedByName}</p>
                        </div>
                        <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100">Assign</Button>
                     </div>
                   ))}
                </div>
                <button onClick={() => setActiveTab('unassigned')} className="w-full py-3 bg-zinc-50/50 text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] hover:text-red-600 transition-colors border-t border-zinc-100">
                   View all {unassignedTickets.length} unassigned →
                </button>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'approvals' && (
         <div className="space-y-6">
            {pendingBookings.length === 0 ? (
               <EmptyState icon={CheckCircle2} title="All caught up!" description="No pending approvals at the moment." />
            ) : (
               <div className="grid grid-cols-1 gap-6">
                  {pendingBookings.map(req => (
                     <div key={req.id} className="card p-6 flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                           <div className="flex items-start gap-4">
                              <Avatar name={req.userName} size="xl" className="ring-4 ring-zinc-50" />
                              <div className="space-y-1">
                                 <h4 className="text-xl font-black text-zinc-900 leading-tight">{req.userName}</h4>
                                 <div className="flex items-center gap-2">
                                    <Badge status={ROLES.STUDENT} className="text-[9px] px-1.5 py-0" />
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mt-0.5">Submitted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</span>
                                 </div>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-8">
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Resource</p>
                                 <p className="text-sm font-bold text-zinc-900">{req.resourceName}</p>
                                 <p className="text-[10px] font-medium text-zinc-500">Block A, Ground Floor</p>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date & Time</p>
                                 <p className="text-sm font-bold text-zinc-900">{new Date(req.startDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                 <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">{new Date(req.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(req.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                              </div>
                           </div>
                           <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                              <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Purpose</p>
                              <p className="text-sm text-zinc-700 leading-relaxed italic">"{req.purpose}"</p>
                           </div>
                        </div>
                        <div className="md:w-48 flex flex-col gap-3 justify-center">
                           <Button className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20">Approve</Button>
                           <Button variant="danger-ghost" className="w-full justify-center border-red-200">Reject Request</Button>
                        </div>
                     </div>
                  ))}
               </div>
            )}
         </div>
      )}

      {activeTab === 'unassigned' && (
         <div className="space-y-6">
            {unassignedTickets.length === 0 ? (
               <EmptyState icon={CheckCircle2} title="All tickets are assigned." description="Your maintenance team is fully utilized." />
            ) : (
               <div className="grid grid-cols-1 gap-4">
                  {unassignedTickets.map(ticket => (
                    <div key={ticket.id} className={cn("card p-6 flex flex-col md:flex-row gap-6 border-l-8", ticket.priority === 'CRITICAL' ? 'border-red-500' : 'border-orange-500')}>
                       <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                             <Badge status={ticket.priority} />
                             <Badge status={ticket.category} className="bg-zinc-100 text-zinc-500" />
                             <span className="text-[10px] font-black text-zinc-300 ml-auto uppercase tracking-widest">{ticket.id}</span>
                          </div>
                          <h4 className="text-lg font-black text-zinc-900 leading-snug">{ticket.description}</h4>
                          <div className="flex items-center gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                             <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {ticket.location}</span>
                             <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {ticket.reportedByName}</span>
                             <span>{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</span>
                          </div>
                       </div>
                       <div className="md:w-64 space-y-3">
                          <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Quick Assign</p>
                          <select className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-sm font-bold focus:ring-2 focus:ring-brand-500 outline-none cursor-pointer">
                             <option value="">Select Technician</option>
                             {technicians.map(tech => <option key={tech.id} value={tech.id}>{tech.name}</option>)}
                          </select>
                          <Button className="w-full justify-center py-2.5">Confirm Assignment</Button>
                       </div>
                    </div>
                  ))}
               </div>
            )}
         </div>
      )}

      {activeTab === 'all-bookings' && (
         <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100">
               <FilterBar filters={['Status', 'Resource', 'Role']} />
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-zinc-50/50 border-b border-zinc-100">
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resource</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {BOOKINGS.map(b => (
                        <tr key={b.id} className="hover:bg-zinc-50 transition-colors">
                           <td className="px-6 py-4 font-bold text-sm text-zinc-900">{b.userName}</td>
                           <td className="px-6 py-4 text-sm text-zinc-600">{b.resourceName}</td>
                           <td className="px-6 py-4 text-xs font-medium text-zinc-500">{new Date(b.startDateTime).toLocaleDateString()}</td>
                           <td className="px-6 py-4"><Badge status={b.status} /></td>
                           <td className="px-6 py-4 text-right"><Button variant="ghost" size="sm">Details</Button></td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      )}

      {activeTab === 'users' && (
         <div className="card overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
               <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">User Directory</h3>
               <Button icon={Plus} size="sm">Add User</Button>
            </div>
            <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-zinc-50 border-b border-zinc-100">
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">User Details</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                     {USERS_DATA.map(user => (
                        <tr key={user.id} className={cn("hover:bg-zinc-50 transition-colors", !user.isActive && "opacity-50 grayscale")}>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <Avatar name={user.name} initials={user.initials} size="md" />
                                 <div className="flex flex-col">
                                    <span className="text-sm font-bold text-zinc-900">{user.name}</span>
                                    <span className="text-xs text-zinc-500">{user.email}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <select className="bg-zinc-50 border border-zinc-200 rounded-lg px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-brand-500 outline-none">
                                 {Object.values(ROLES).map(r => <option key={r} value={r} selected={user.role === r}>{r}</option>)}
                              </select>
                           </td>
                           <td className="px-6 py-4 text-xs font-medium text-zinc-500">{user.department}</td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                 {user.isActive ? (
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">Deactivate</Button>
                                 ) : (
                                    <Button variant="secondary" size="sm">Reactivate</Button>
                                 )}
                              </div>
                           </td>
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
