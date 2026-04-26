import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  User, 
  Calendar, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  Send,
  MoreVertical,
  Wrench,
  XCircle,
  Settings2
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import Textarea from '../components/ui/Textarea';
import { TICKETS, USERS, ROLES } from '../data';
import { cn } from '../utils/cn';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';

export default function TicketDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { canManageTicket } = usePermissions();
  const ticket = TICKETS.find(t => t.id === id);

  const [status, setStatus] = useState(ticket?.status || 'OPEN');
  const [resolutionNotes, setResolutionNotes] = useState('');
  const [assigneeId, setAssigneeId] = useState(ticket?.assignedToId || '');

  if (!ticket) return null;

  const isAdmin = currentUser.role === ROLES.ADMIN;
  const isTechnician = currentUser.role === ROLES.TECHNICIAN;
  const isAssignedTechnician = isTechnician && ticket.assignedToId === currentUser.id;

  const technicians = USERS.filter(u => u.role === ROLES.TECHNICIAN);
  const steps = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  const currentStepIdx = steps.indexOf(ticket.status);

  const handleSaveChanges = () => {
    toast.success('Ticket updated successfully');
  };

  const renderActionsSidebar = () => {
    if (isAdmin) {
      return (
        <div className="card p-6 space-y-6 border-brand-100 bg-brand-50/5">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
             <Settings2 className="w-4 h-4 text-brand-600" />
             Admin Actions
          </h3>
          <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Update Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-brand-500 outline-none"
                >
                   {steps.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Assign Technician</label>
                <select 
                  value={assigneeId}
                  onChange={(e) => setAssigneeId(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-brand-500 outline-none"
                >
                   <option value="">Unassigned</option>
                   {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Resolution Notes</label>
                <Textarea 
                  placeholder="Enter notes..." 
                  value={resolutionNotes} 
                  onChange={(e) => setResolutionNotes(e.target.value)} 
                />
             </div>
             <Button className="w-full justify-center" onClick={handleSaveChanges}>Save Changes</Button>
             <Button variant="danger-ghost" className="w-full justify-center" icon={XCircle}>Reject Ticket</Button>
          </div>
        </div>
      );
    }

    if (isAssignedTechnician) {
      return (
        <div className="card p-6 space-y-6 border-violet-100 bg-violet-50/5">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest flex items-center gap-2">
             <Wrench className="w-4 h-4 text-violet-600" />
             Technician Actions
          </h3>
          <div className="space-y-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</label>
                <select 
                  value={status} 
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-brand-500 outline-none"
                >
                   <option value="OPEN">Open</option>
                   <option value="IN_PROGRESS">In Progress</option>
                   <option value="RESOLVED">Resolved</option>
                </select>
             </div>
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Resolution Notes {status === 'RESOLVED' && '*'}</label>
                <Textarea 
                  placeholder="Mandatory for resolution..." 
                  value={resolutionNotes} 
                  onChange={(e) => setResolutionNotes(e.target.value)} 
                  required={status === 'RESOLVED'}
                />
             </div>
             <Button 
               className="w-full justify-center" 
               onClick={handleSaveChanges}
               disabled={status === 'RESOLVED' && !resolutionNotes}
             >
                Save Updates
             </Button>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to list
        </button>
        <div className="flex gap-2">
           <Badge status={ticket.priority} />
           <Badge status={ticket.category} className="bg-zinc-100 text-zinc-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{ticket.id}</p>
            <h1 className="text-3xl font-black text-zinc-900 leading-tight">{ticket.description}</h1>
            
            <div className="pt-8 pb-4">
               <div className="flex items-center justify-between relative">
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-zinc-100 -translate-y-1/2" />
                  <div 
                    className="absolute top-4 left-0 h-0.5 bg-brand-500 -translate-y-1/2 transition-all duration-500" 
                    style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
                  />
                  {steps.map((step, idx) => (
                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                       <div className={cn(
                         "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-4",
                         idx <= currentStepIdx ? "bg-brand-500 border-brand-100 text-white" : "bg-white border-zinc-100 text-zinc-300"
                       )}>
                          {idx <= currentStepIdx ? <CheckCircle2 className="w-4 h-4" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-200" />}
                       </div>
                       <span className={cn(
                         "text-[9px] font-black uppercase tracking-widest",
                         idx <= currentStepIdx ? "text-brand-600" : "text-zinc-400"
                       )}>
                         {step.replace('_', ' ')}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div className="card p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Location</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-900">
                   <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                   {ticket.location}
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Reported By</p>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                   <Avatar initials={ticket.reportedByName.charAt(0)} size="sm" />
                   {ticket.reportedByName}
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Assigned To</p>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
                   {ticket.assignedToName ? (
                     <>
                       <Avatar initials={ticket.assignedToName.charAt(0)} size="sm" />
                       {ticket.assignedToName}
                     </>
                   ) : (
                     <span className="text-zinc-400 italic">Unassigned</span>
                   )}
                </div>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Created</p>
                <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-900">
                   <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                   {new Date(ticket.createdAt).toLocaleDateString()}
                </div>
             </div>
          </div>

          <div className="space-y-6">
             <h3 className="text-lg font-black text-zinc-900 flex items-center gap-2">
                Activity
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-500 text-xs rounded-md">{ticket.comments?.length || 0}</span>
             </h3>
             
             <div className="space-y-6">
                {ticket.comments?.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                     <Avatar name={comment.authorName} initials={comment.authorName.charAt(0)} size="md" />
                     <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                           <span className="text-sm font-bold text-zinc-900">{comment.authorName}</span>
                           <Badge status={comment.authorRole} className="text-[9px] px-1.5 py-0" />
                           <span className="text-[10px] font-medium text-zinc-400">
                             {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                           </span>
                        </div>
                        <div className="bg-zinc-50 p-4 rounded-2xl text-sm text-zinc-700 leading-relaxed border border-zinc-100">
                           {comment.content}
                        </div>
                     </div>
                  </div>
                ))}
                
                <div className="flex gap-4 pt-4 border-t border-zinc-100">
                   <Avatar name={currentUser.name} initials={currentUser.initials} size="md" />
                   <div className="flex-1 space-y-3">
                      <Textarea placeholder="Write a comment..." rows={3} className="bg-white border-zinc-200" />
                      <div className="flex justify-end">
                         <Button icon={Send} iconPosition="right">Post Comment</Button>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="space-y-6">
           {renderActionsSidebar()}

           <div className="card p-6 space-y-4">
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Information</h3>
              <div className="space-y-3">
                 <div className="flex justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Category</span>
                    <span className="text-xs font-bold text-zinc-900">{ticket.category}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Priority</span>
                    <Badge status={ticket.priority} />
                 </div>
                 <div className="flex justify-between">
                    <span className="text-xs text-zinc-500 font-medium">Updated</span>
                    <span className="text-xs font-bold text-zinc-900">
                      {formatDistanceToNow(new Date(ticket.updatedAt), { addSuffix: true })}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

