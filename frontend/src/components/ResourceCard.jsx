import React from 'react';
import { 
  Building2, 
  FlaskConical, 
  Users, 
  Monitor, 
  MapPin, 
  Clock,
  Settings2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';
import Badge from './ui/Badge';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { ROLES, BOOKINGS } from '../data';

const TYPE_ICON_MAP = {
  LECTURE_HALL: Building2,
  LAB: FlaskConical,
  MEETING_ROOM: Users,
  EQUIPMENT: Monitor,
};

export default function ResourceCard({ resource, view = 'grid', onBook, onClick }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { studentHasActiveBooking } = usePermissions();
  const Icon = TYPE_ICON_MAP[resource.type] || Building2;
  const isOutOfService = resource.status === 'OUT_OF_SERVICE';
  const hasActiveBooking = studentHasActiveBooking(BOOKINGS);

  const renderActionButtons = (isList = false) => {
    if (currentUser.role === ROLES.TECHNICIAN) return null;

    const bookBtn = (
      <Button 
        variant="primary" 
        size={isList ? "sm" : "md"}
        className={cn(!isList && "w-full justify-center")}
        disabled={isOutOfService || (currentUser.role === ROLES.STUDENT && hasActiveBooking)}
        onClick={(e) => {
          e.stopPropagation();
          onBook && onBook();
        }}
      >
        {isOutOfService ? "Unavailable" : "Book Now"}
      </Button>
    );

    const wrappedBookBtn = currentUser.role === ROLES.STUDENT && hasActiveBooking ? (
      <Tooltip content="You already have an active booking. Cancel it first to make a new one.">
        {bookBtn}
      </Tooltip>
    ) : bookBtn;

    if (currentUser.role === ROLES.ADMIN) {
      return (
        <div className={cn("flex items-center gap-2", !isList && "flex-col w-full")}>
          {wrappedBookBtn}
          <Button 
            variant="secondary" 
            size={isList ? "sm" : "md"}
            className={cn(!isList && "w-full justify-center")}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/admin/resources');
            }}
            icon={Settings2}
          >
            Manage
          </Button>
        </div>
      );
    }

    return wrappedBookBtn;
  };

  if (view === 'list') {
    return (
      <tr className="hover:bg-zinc-50/50 transition-colors group cursor-pointer" onClick={onClick}>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center">
              <Icon className="w-4 h-4 text-zinc-500" />
            </div>
            <p className="text-sm font-bold text-zinc-900">{resource.name}</p>
          </div>
        </td>
        <td className="px-6 py-4">
          <Badge status={resource.type} className="bg-zinc-100 text-zinc-600 ring-zinc-200" />
        </td>
        <td className="px-6 py-4">
          <p className="text-xs text-zinc-500 font-medium">{resource.location}</p>
        </td>
        <td className="px-6 py-4">
          <p className="text-xs text-zinc-500">{resource.capacity > 1 ? `${resource.capacity} people` : '-'}</p>
        </td>
        <td className="px-6 py-4">
          <Badge status={resource.status} />
        </td>
        <td className="px-6 py-4 text-right">
          <div className="inline-flex items-center gap-2">
            {renderActionButtons(true)}
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="card group hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 overflow-hidden cursor-pointer relative" onClick={onClick}>
      {/* Top Image Area */}
      <div className="h-40 bg-zinc-50 flex items-center justify-center relative overflow-hidden">
        {resource.image ? (
          <img src={resource.image} alt={resource.name} className="w-full h-full object-cover" />
        ) : (
          <Icon className="w-12 h-12 text-zinc-200" />
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge status={resource.status} className="shadow-sm" />
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
           <h3 className="font-bold text-zinc-900 leading-tight group-hover:text-brand-600 transition-colors">{resource.name}</h3>
        </div>
        
        <div className="flex items-center gap-1.5 text-zinc-500 mb-3">
          <MapPin className="w-3 h-3" />
          <span className="text-[11px] font-medium truncate">{resource.location}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge status={resource.type} className="text-[10px] bg-zinc-100 text-zinc-600" />
          {resource.capacity > 1 && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-100 rounded text-[10px] font-bold text-zinc-500">
               <Users className="w-2.5 h-2.5" />
               Up to {resource.capacity}
            </div>
          )}
        </div>

        <div className="space-y-2 mb-6">
           {resource.availabilityWindows && resource.availabilityWindows[0] && (
             <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-medium">
                <Clock className="w-3 h-3 text-zinc-400" />
                {resource.availabilityWindows[0]}
             </div>
           )}
        </div>

        {renderActionButtons(false)}
      </div>
    </div>
  );
}
