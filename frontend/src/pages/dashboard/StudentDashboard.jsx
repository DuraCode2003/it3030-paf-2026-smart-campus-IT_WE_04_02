import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  AlertTriangle, 
  Bell, 
  AlertCircle, 
  ChevronRight, 
  MapPin, 
  CalendarX, 
  ClipboardList, 
  CheckCircle2, 
  MessageSquare,
  Building2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { BOOKINGS, TICKETS, NOTIFICATIONS, ROLES } from '../../data';
import Tabs from '../../components/ui/Tabs';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import Avatar from '../../components/ui/Avatar';
import { cn } from '../../utils/cn';

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { currentUser } = useAuth();
  const { studentHasActiveBooking } = usePermissions();
  const navigate = useNavigate();

  const myBookings = BOOKINGS.filter(b => b.userId === currentUser.id);
  const myTickets = TICKETS.filter(t => t.reportedById === currentUser.id);
  const myNotifs = NOTIFICATIONS; // In a real app, this would be filtered by userId

  const approvedBookings = myBookings.filter(b => b.status === 'APPROVED');
  const pendingBookings = myBookings.filter(b => b.status === 'PENDING');
  const rejectedBookings = myBookings.filter(b => b.status === 'REJECTED');
  const openTicketsCount = myTickets.filter(t => ['OPEN', 'IN_PROGRESS'].includes(t.status)).length;
  const unreadNotifsCount = myNotifs.filter(n => !n.isRead).length;

  const hasActiveBooking = studentHasActiveBooking(BOOKINGS);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'bookings', label: 'My Bookings', count: approvedBookings.length },
    { id: 'requests', label: 'My Requests', count: pendingBookings.length },
    { id: 'tickets', label: 'My Tickets', count: myTickets.length },
    { id: 'notifications', label: 'Notifications', count: unreadNotifsCount },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Active Booking" 
              value={approvedBookings.length} 
              subtitle="Currently approved" 
              icon={CalendarCheck} 
              colorClass="bg-emerald-50 shadow-emerald-500/10" 
              iconColorClass="text-emerald-600" 
            />
            <StatCard 
              title="Pending Requests" 
              value={pendingBookings.length} 
              subtitle="Awaiting admin approval" 
              icon={Clock} 
              colorClass="bg-amber-50 shadow-amber-500/10" 
              iconColorClass="text-amber-600" 
            />
            <StatCard 
              title="Open Tickets" 
              value={openTicketsCount} 
              subtitle="Reported incidents" 
              icon={AlertTriangle} 
              colorClass="bg-red-50 shadow-red-500/10" 
              iconColorClass="text-red-600" 
            />
            <StatCard 
              title="Notifications" 
              value={unreadNotifsCount} 
              subtitle="Unread" 
              icon={Bell} 
              colorClass="bg-brand-50 shadow-brand-500/10" 
              iconColorClass="text-brand-600" 
            />
          </div>

          {hasActiveBooking && (
            <div className="flex items-center gap-4 bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-amber-900">
                  You have an active booking. You cannot make another booking until your current one is completed or cancelled.
                </p>
                <button 
                  onClick={() => setActiveTab('bookings')} 
                  className="text-xs font-black text-amber-700 uppercase tracking-widest mt-1 hover:underline flex items-center gap-1"
                >
                  View my booking <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="card p-6">
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 gap-4">
                   <Link to="/resources" className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-brand-500 transition-all group">
                      <Building2 className="w-6 h-6 text-zinc-400 group-hover:text-brand-500 mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Resources</span>
                   </Link>
                   <Link to="/tickets/new" className="flex flex-col items-center justify-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-red-500 transition-all group">
                      <AlertTriangle className="w-6 h-6 text-zinc-400 group-hover:text-red-500 mb-2" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Report fault</span>
                   </Link>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="space-y-6">
          {approvedBookings.length === 0 ? (
            <EmptyState 
              icon={CalendarX} 
              title="No active bookings" 
              description="You don't have any approved facility reservations at the moment."
              action={
                <Button onClick={() => navigate('/resources')}>Book a Resource</Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {approvedBookings.map(booking => (
                <div key={booking.id} className="card p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-black text-zinc-900 tracking-tight">{booking.resourceName}</h4>
                      <Badge status="APPROVED" className="mt-1" />
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded-lg">
                      <MapPin className="w-3 h-3" />
                      Block A, SLIIT
                    </div>
                  </div>
                  
                  <div className="bg-zinc-50 rounded-2xl p-4 flex items-center justify-between">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date & Time</p>
                        <p className="text-sm font-black text-zinc-900">
                          {new Date(booking.startDateTime).toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {new Date(booking.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – {new Date(booking.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                     </div>
                     <div className="h-10 w-[1px] bg-zinc-200" />
                     <div className="text-right">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Purpose</p>
                        <p className="text-xs text-zinc-600 font-medium line-clamp-1 max-w-[150px]">{booking.purpose}</p>
                     </div>
                  </div>

                  <Button variant="danger-ghost" className="w-full justify-center py-2.5">Cancel Booking</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-12">
          {pendingBookings.length === 0 && rejectedBookings.length === 0 ? (
            <EmptyState 
              icon={ClipboardList} 
              title="No pending requests" 
              description="All your reservation requests have been processed."
            />
          ) : (
            <>
              {pendingBookings.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2 px-2">
                     Pending Approval
                     <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 text-[10px] flex items-center justify-center font-black">{pendingBookings.length}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pendingBookings.map(req => (
                      <div key={req.id} className="card p-6 space-y-4 border-amber-100 bg-amber-50/5">
                        <div className="flex items-start justify-between">
                          <h4 className="text-lg font-black text-zinc-900 leading-tight">{req.resourceName}</h4>
                          <Badge status="PENDING" />
                        </div>
                        <div className="space-y-2">
                           <p className="text-sm font-bold text-zinc-700">
                             {new Date(req.startDateTime).toLocaleDateString()} at {new Date(req.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </p>
                           <p className="text-xs text-zinc-500 italic">"{req.purpose}"</p>
                        </div>
                        <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                           <span className="text-[10px] font-bold text-zinc-400">Submitted {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}</span>
                           <Button variant="ghost" size="sm" className="text-zinc-500 hover:bg-zinc-100">Cancel Request</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rejectedBookings.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2 px-2">
                     Previously Rejected
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60">
                    {rejectedBookings.map(req => (
                      <div key={req.id} className="card p-6 space-y-4 bg-zinc-50">
                        <div className="flex items-start justify-between">
                          <h4 className="text-lg font-black text-zinc-700 leading-tight">{req.resourceName}</h4>
                          <Badge status="REJECTED" />
                        </div>
                        {req.adminNote && (
                          <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-xs text-red-700 leading-relaxed italic">
                            "{req.adminNote}"
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {myTickets.length === 0 ? (
            <EmptyState 
              icon={CheckCircle2} 
              title="No incidents reported" 
              description="Everything seems to be working perfectly! Good job."
              action={
                <Button onClick={() => navigate('/tickets/new')}>Report an Incident</Button>
              }
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {myTickets.map(ticket => (
                <div 
                  key={ticket.id} 
                  onClick={() => navigate(`/tickets/${ticket.id}`)}
                  className={cn(
                    "card p-5 flex flex-col md:flex-row md:items-center gap-6 cursor-pointer hover:shadow-card-hover transition-all border-l-4",
                    ticket.priority === 'CRITICAL' ? "border-red-500" : 
                    ticket.priority === 'HIGH' ? "border-orange-500" :
                    ticket.priority === 'MEDIUM' ? "border-amber-500" : "border-zinc-300"
                  )}
                >
                  <div className="flex-1 space-y-2">
                     <div className="flex items-center gap-3">
                        <Badge status={ticket.category} className="bg-zinc-100 text-zinc-600" />
                        <Badge status={ticket.status} />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-auto md:ml-0">{ticket.id}</span>
                     </div>
                     <h4 className="text-sm font-bold text-zinc-900 line-clamp-2">{ticket.description}</h4>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                           <MapPin className="w-3 h-3" />
                           {ticket.location}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                           <MessageSquare className="w-3 h-3" />
                           {ticket.comments?.length || 0} comments
                        </div>
                     </div>
                  </div>
                  <div className="text-right shrink-0">
                     <p className="text-[10px] font-bold text-zinc-400">{formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}</p>
                  </div>
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
              <div 
                key={notif.id} 
                className={cn(
                  "p-6 flex gap-4 transition-all hover:bg-zinc-50/50",
                  !notif.isRead && "bg-brand-50/30 border-l-4 border-brand-500"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                  notif.type === 'BOOKING_APPROVED' ? "bg-emerald-50 text-emerald-600" :
                  notif.type === 'BOOKING_REJECTED' ? "bg-red-50 text-red-600" :
                  "bg-blue-50 text-blue-600"
                )}>
                   {notif.type.includes('BOOKING') ? <CalendarCheck className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                     <p className="text-sm font-bold text-zinc-900">{notif.title}</p>
                     <span className="text-[10px] font-medium text-zinc-400">
                       {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
                     </span>
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
