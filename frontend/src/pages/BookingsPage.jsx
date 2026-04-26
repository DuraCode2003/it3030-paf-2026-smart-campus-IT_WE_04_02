import React, { useState } from 'react';
import { 
  Building2, 
  CalendarCheck, 
  CheckCircle, 
  XCircle, 
  Eye,
  CalendarRange,
  ClipboardList,
  Search,
  Filter
} from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import PageHeader from '../components/ui/PageHeader';
import Tabs from '../components/ui/Tabs';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import ResourceTimeline from '../components/ResourceTimeline';
import Select from '../components/ui/Select';
import { BOOKINGS, RESOURCES, ROLES } from '../data';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { cn } from '../utils/cn';

export default function BookingsPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { canManageBookings, canViewAllBookings } = usePermissions();
  
  const [activeTab, setActiveTab] = useState(
    currentUser.role === ROLES.ADMIN ? 'all' : 'my'
  );
  const [selectedResourceId, setSelectedResourceId] = useState('');

  if (currentUser.role === ROLES.TECHNICIAN) {
    return <Navigate to="/dashboard" replace />;
  }

  const myBookings = BOOKINGS.filter(b => b.userId === currentUser.id);
  const pendingBookings = BOOKINGS.filter(b => b.status === 'PENDING');
  
  const tabs = [];
  if (currentUser.role === ROLES.STUDENT || currentUser.role === ROLES.LECTURER) {
    tabs.push({ id: 'my', label: 'My Bookings', count: myBookings.length });
  }
  if (currentUser.role === ROLES.LECTURER) {
    tabs.push({ id: 'availability', label: 'All Availability' });
  }
  if (currentUser.role === ROLES.ADMIN) {
    tabs.push({ id: 'all', label: 'All Bookings', count: BOOKINGS.length });
    tabs.push({ id: 'pending', label: 'Pending Approvals', count: pendingBookings.length });
  }

  const renderTable = (data) => (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50 border-b border-zinc-100">
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Resource</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Purpose</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-[10px] font-bold text-zinc-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {data.map((booking) => (
              <tr key={booking.id} className="hover:bg-zinc-50/50 transition-colors group">
                <td className="px-6 py-4">
                   <p className="text-sm font-bold text-zinc-900">{booking.resourceName}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-zinc-900">{new Date(booking.startDateTime).toLocaleDateString()}</span>
                    <span className="text-[10px] text-zinc-400">{new Date(booking.startDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-zinc-600 line-clamp-1">{booking.purpose}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge status={booking.status} />
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {activeTab === 'pending' && canManageBookings() ? (
                      <>
                        <Button variant="ghost" size="sm" className="text-emerald-600">Approve</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Reject</Button>
                      </>
                    ) : (
                      <>
                         {(booking.status === 'PENDING' || booking.status === 'APPROVED') && (
                           <Button variant="danger-ghost" size="sm">Cancel</Button>
                         )}
                         <Button variant="secondary" size="sm"><Eye className="w-4 h-4" /></Button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in space-y-6">
      <PageHeader 
        title="Facility Bookings" 
        subtitle="Manage your reservations and track approval status."
        actions={
          currentUser.role !== ROLES.ADMIN && (
            <Button onClick={() => navigate('/bookings/new')}>New Booking</Button>
          )
        }
      />

      {tabs.length > 1 && (
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      )}

      {activeTab === 'my' && (
        myBookings.length === 0 ? (
          <EmptyState icon={CalendarCheck} title="No bookings found" description="You haven't made any reservations yet." />
        ) : renderTable(myBookings)
      )}

      {activeTab === 'availability' && (
        <div className="space-y-6">
           <div className="max-w-xs">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1.5 block">Select Resource to check</label>
              <Select 
                options={RESOURCES.map(r => ({ value: r.id, label: r.name }))}
                value={selectedResourceId}
                onChange={setSelectedResourceId}
                placeholder="Choose a resource..."
              />
           </div>
           {selectedResourceId ? (
             <ResourceTimeline 
               resource={RESOURCES.find(r => r.id === selectedResourceId)} 
               bookings={BOOKINGS.filter(b => b.resourceId === selectedResourceId)} 
             />
           ) : (
             <EmptyState icon={CalendarRange} title="Select a resource" description="Choose a resource above to view its availability timeline." />
           )}
        </div>
      )}

      {activeTab === 'all' && renderTable(BOOKINGS)}
      
      {activeTab === 'pending' && (
        pendingBookings.length === 0 ? (
          <EmptyState icon={CheckCircle} title="All caught up!" description="No pending approvals." />
        ) : renderTable(pendingBookings)
      )}
    </div>
  );
}
