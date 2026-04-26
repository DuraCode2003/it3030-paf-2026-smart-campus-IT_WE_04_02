import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  AlertTriangle, 
  Bell, 
  ChevronRight, 
  MapPin, 
  Eye,
  Calendar,
  XCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow, startOfWeek, addDays, format, isSameDay } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { BOOKINGS, TICKETS, NOTIFICATIONS, ROLES } from '../../data';
import Tabs from '../../components/ui/Tabs';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import { cn } from '../../utils/cn';

export default function LecturerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const myBookings = BOOKINGS.filter(b => b.userId === currentUser.id);
  const myTickets = TICKETS.filter(t => t.reportedById === currentUser.id);
  const myNotifs = NOTIFICATIONS;

  const approvedBookings = myBookings.filter(b => b.status === 'APPROVED');
  const pendingBookings = myBookings.filter(b => b.status === 'PENDING');
  const openTicketsCount = myTickets.filter(t => ['OPEN', 'IN_PROGRESS'].includes(t.status)).length;
  const unreadNotifsCount = myNotifs.filter(n => !n.isRead).length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'My Bookings', count: approvedBookings.length },
    { id: 'requests', label: 'My Requests', count: pendingBookings.length },
    { id: 'tickets', label: 'My Tickets', count: myTickets.length },
    { id: 'notifications', label: 'Notifications', count: unreadNotifsCount },
  ];

  // Schedule Logic
  const today = new Date('2026-04-26'); // Hardcoded "today" for mock data consistency
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // Monday
  const weekDays = Array.from({ length: 5 }).map((_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Upcoming Bookings" 
              value={approvedBookings.length} 
              icon={CalendarCheck} 
              colorClass="bg-brand-50 shadow-brand-500/10" 
              iconColorClass="text-brand-600" 
            />
            <StatCard 
              title="Pending Requests" 
              value={pendingBookings.length} 
              icon={Clock} 
              colorClass="bg-amber-50 shadow-amber-500/10" 
              iconColorClass="text-amber-600" 
            />
            <StatCard 
              title="My Open Tickets" 
              value={openTicketsCount} 
              icon={AlertTriangle} 
              colorClass="bg-red-50 shadow-red-500/10" 
              iconColorClass="text-red-600" 
            />
            <StatCard 
              title="Notifications" 
              value={unreadNotifsCount} 
              icon={Bell} 
              colorClass="bg-violet-50 shadow-violet-500/10" 
              iconColorClass="text-violet-600" 
            />
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">This Week's Schedule</h3>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mon 27 Apr – Fri 1 May</span>
             </div>
             <div className="grid grid-cols-5 gap-4">
                {weekDays.map(day => {
                  const dayBookings = approvedBookings.filter(b => isSameDay(new Date(b.startDateTime), day));
                  return (
                    <div key={day.toString()} className="flex flex-col gap-3 min-h-[200px]">
                      <div className="text-center p-2 rounded-xl bg-zinc-50 border border-zinc-100">
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{format(day, 'EEE')}</p>
                         <p className="text-xs font-black text-zinc-900">{format(day, 'd MMM')}</p>
                      </div>
                      <div className="flex-1 bg-zinc-50/50 rounded-2xl border border-dashed border-zinc-200 p-2 space-y-2">
                        {dayBookings.length === 0 ? (
                          <div className="h-full flex items-center justify-center italic text-[10px] text-zinc-300 font-bold uppercase tracking-widest">Free</div>
                        ) : (
                          dayBookings.map(b => (
                            <Link 
                              key={b.id} 
                              to={`/bookings/${b.id}`}
                              className="block p-3 bg-white rounded-xl shadow-sm border border-zinc-100 hover:border-brand-500 transition-all group"
                            >
                               <p className="text-[10px] font-black text-brand-600 mb-1">
                                 {format(new Date(b.startDateTime), 'HH:mm')}
                               </p>
                               <p className="text-[10px] font-bold text-zinc-900 line-clamp-2 leading-tight">{b.resourceName}</p>
                            </Link>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="card overflow-hidden">
           <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
             <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest italic">Approved Reservations</h3>
             <Button onClick={() => navigate('/resources')} size="sm">New Booking</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50/30 border-b border-zinc-100">
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {approvedBookings.map(b => (
                  <tr key={b.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{b.resourceName}</p>
                          <p className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5" /> Block A
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-900">
                      {format(new Date(b.startDateTime), 'dd MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-zinc-900">
                       {format(new Date(b.startDateTime), 'HH:mm')} – {format(new Date(b.endDateTime), 'HH:mm')}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <Button variant="secondary" size="sm" onClick={() => navigate(`/bookings/${b.id}`)}>View</Button>
                          <Button variant="danger-ghost" size="sm">Cancel</Button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Requests, Tickets, Notifications same as student but slightly different context */}
      {/* ... (Implementation logic continues for other tabs) */}
      {activeTab === 'requests' && (
        <div className="space-y-12">
            <div className="space-y-6">
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2 px-2">
                  Pending Approval
              </h3>
              {pendingBookings.length === 0 ? (
                <EmptyState icon={ClipboardList} title="No pending requests" description="All your requests are processed." />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pendingBookings.map(req => (
                    <div key={req.id} className="card p-6 space-y-4 border-amber-100 bg-amber-50/5">
                      <div className="flex items-start justify-between">
                        <h4 className="text-lg font-black text-zinc-900 leading-tight">{req.resourceName}</h4>
                        <Badge status="PENDING" />
                      </div>
                      <p className="text-sm font-bold text-zinc-700">
                        {format(new Date(req.startDateTime), 'dd MMM')} at {format(new Date(req.startDateTime), 'HH:mm')}
                      </p>
                      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400">Submitted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</span>
                        <Button variant="ghost" size="sm" className="text-zinc-500 hover:bg-zinc-100">Cancel Request</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {myTickets.length === 0 ? (
            <EmptyState icon={CheckCircle2} title="No tickets" description="You haven't reported any incidents." />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myTickets.map(ticket => (
                <div key={ticket.id} className="card p-5 border-l-4 border-brand-500 hover:shadow-card-hover transition-all cursor-pointer" onClick={() => navigate(`/tickets/${ticket.id}`)}>
                  <div className="flex items-center justify-between mb-2">
                    <Badge status={ticket.status} />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{ticket.id}</span>
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">{ticket.description}</h4>
                  <p className="text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-widest">{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'notifications' && (
         <div className="card max-w-4xl mx-auto overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
               <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Your Notifications</h3>
               <Button variant="secondary" size="sm">Mark all as read</Button>
            </div>
            <div className="divide-y divide-zinc-100">
              {myNotifs.map(notif => (
                <div key={notif.id} className={cn("p-6 flex gap-4 transition-all hover:bg-zinc-50/50", !notif.isRead && "bg-brand-50/30 border-l-4 border-brand-500")}>
                  <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center shrink-0">
                    <Bell className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                       <p className="text-sm font-bold text-zinc-900">{notif.title}</p>
                       <span className="text-[10px] font-medium text-zinc-400">{formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}</span>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
         </div>
      )}
    </div>
  );
}
