import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Calendar, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Eye,
  CalendarCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { BOOKINGS, CURRENT_USER } from '../data';
import { cn } from '../utils/cn';

export default function BookingsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my');
  const isAdmin = CURRENT_USER.role === 'ADMIN';

  const filteredBookings = BOOKINGS.filter(b => {
    if (activeTab === 'my') return b.userId === CURRENT_USER.id;
    return true; // All for admin
  });

  const tabs = [
    { id: 'my', label: 'My Bookings', count: BOOKINGS.filter(b => b.userId === CURRENT_USER.id).length },
  ];

  if (isAdmin) {
    tabs.push({ id: 'all', label: 'All Bookings', count: BOOKINGS.length });
  }

  return (
    <div className="animate-fade-in">
      <PageHeader 
        title="Facility Bookings" 
        subtitle="Manage your reservations and track approval status."
        actions={
          <Button onClick={() => navigate('/bookings/new')}>
            New Booking
          </Button>
        }
      />

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {filteredBookings.length === 0 ? (
        <EmptyState 
          icon={CalendarCheck}
          title="No bookings found"
          description={activeTab === 'my' ? "You haven't made any reservations yet." : "No bookings matching current view."}
          action={
            activeTab === 'my' && (
              <Button onClick={() => navigate('/resources')}>
                Browse Catalogue
              </Button>
            )
          }
        />
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-100">
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-zinc-500" />
                        </div>
                        <p className="text-sm font-bold text-zinc-900">{booking.resourceName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-zinc-600 line-clamp-1 max-w-[200px]">{booking.purpose}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-zinc-900">
                          {new Date(booking.startDateTime).toLocaleDateString('en-GB', { 
                            weekday: 'short', 
                            day: 'numeric', 
                            month: 'short' 
                          })}
                        </span>
                        <span className="text-[10px] font-medium text-zinc-400">
                           {new Date(booking.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – 
                           {new Date(booking.endDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isAdmin && booking.status === 'PENDING' && (
                            <>
                              <Button variant="ghost" size="sm" className="text-emerald-600 hover:bg-emerald-50">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="secondary" size="sm">
                             <Eye className="w-4 h-4" />
                          </Button>
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
