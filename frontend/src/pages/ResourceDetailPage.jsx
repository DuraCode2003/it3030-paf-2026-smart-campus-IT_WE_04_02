import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Building2, 
  FlaskConical, 
  Users, 
  Monitor, 
  MapPin, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Settings2
} from 'lucide-react';
import { RESOURCES, BOOKINGS, ROLES } from '../data';
import PageHeader from '../components/ui/PageHeader';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Tooltip from '../components/ui/Tooltip';
import ResourceTimeline from '../components/ResourceTimeline';
import { useAuth } from '../hooks/useAuth';
import { usePermissions } from '../hooks/usePermissions';
import { cn } from '../utils/cn';

const TYPE_ICON_MAP = {
  LECTURE_HALL: Building2,
  LAB: FlaskConical,
  MEETING_ROOM: Users,
  EQUIPMENT: Monitor,
};

export default function ResourceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { studentHasActiveBooking, canViewResource } = usePermissions();
  
  const resource = RESOURCES.find(r => r.id === id);
  const bookings = BOOKINGS.filter(b => b.resourceId === id);

  // Guard: if student tries to access LECTURE_HALL via URL
  if (!resource || !canViewResource(resource)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <AlertTriangle className="w-12 h-12 text-zinc-300 mb-4" />
        <p className="text-zinc-500 font-medium">Resource not found or access restricted.</p>
        <Button onClick={() => navigate('/resources')} className="mt-4">Back to Catalogue</Button>
      </div>
    );
  }

  const Icon = TYPE_ICON_MAP[resource.type] || Building2;
  const isOutOfService = resource.status === 'OUT_OF_SERVICE';
  const hasActiveBooking = studentHasActiveBooking(BOOKINGS);

  const renderBookingButton = () => {
    if (currentUser.role === ROLES.TECHNICIAN) return null;

    const bookBtn = (
      <Button 
        className="w-full h-12 justify-center text-base font-bold shadow-lg shadow-brand-500/20"
        disabled={isOutOfService || (currentUser.role === ROLES.STUDENT && hasActiveBooking)}
        onClick={() => navigate(`/bookings/new?resourceId=${id}`)}
      >
        {isOutOfService ? "Unavailable" : "Book this Resource"}
      </Button>
    );

    if (currentUser.role === ROLES.STUDENT && hasActiveBooking) {
      return (
        <Tooltip content="You already have an active booking. Cancel it first to make a new one.">
          {bookBtn}
        </Tooltip>
      );
    }

    return bookBtn;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to catalogue
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-brand-50 to-zinc-100 h-64 rounded-3xl flex items-center justify-center relative overflow-hidden border border-zinc-100">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500 to-transparent" />
            <Icon className="w-24 h-24 text-brand-200 relative z-10" />
            <div className="absolute top-6 left-6 flex gap-2">
               <Badge status={resource.status} className="shadow-lg" />
               <Badge status={resource.type} className="shadow-lg bg-white/80 backdrop-blur-sm" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-black text-zinc-900 tracking-tight mb-2">{resource.name}</h1>
                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                  <MapPin className="w-4 h-4" />
                  {resource.location}
                </div>
              </div>
            </div>

            <p className="text-zinc-600 leading-relaxed text-lg">
              {resource.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div>
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-4">Amenities</h3>
                <div className="grid grid-cols-1 gap-3">
                  {resource.amenities.map(item => (
                    <div key={item} className="flex items-center gap-3 text-zinc-600">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-widest mb-4">Availability Windows</h3>
                <div className="space-y-3">
                  {resource.availabilityWindows.map(window => (
                    <div key={window} className="flex items-center gap-3 text-zinc-600">
                      <Clock className="w-4 h-4 text-zinc-300 shrink-0" />
                      <span className="text-sm font-medium">{window}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 sticky top-24">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">Reservation</h3>
            
            <div className="space-y-4 mb-8">
               <div className="flex items-center justify-between py-3 border-b border-zinc-50">
                  <span className="text-sm font-medium text-zinc-500">Capacity</span>
                  <span className="text-sm font-bold text-zinc-900">{resource.capacity} people</span>
               </div>
               <div className="flex items-center justify-between py-3 border-b border-zinc-50">
                  <span className="text-sm font-medium text-zinc-500">Resource Type</span>
                  <span className="text-sm font-bold text-zinc-900">{resource.type.replace('_', ' ')}</span>
               </div>
               <div className="flex items-center justify-between py-3 border-b border-zinc-50">
                  <span className="text-sm font-medium text-zinc-500">Current Status</span>
                  <Badge status={resource.status} />
               </div>
            </div>

            <div className="space-y-3">
              {renderBookingButton()}
              
              {currentUser.role === ROLES.ADMIN && (
                <Button 
                  variant="secondary" 
                  className="w-full justify-center" 
                  icon={Settings2}
                  onClick={() => navigate('/admin/resources')}
                >
                  Manage Resource
                </Button>
              )}
            </div>
            
            <Link 
              to="/tickets/new" 
              className="flex items-center justify-center gap-2 mt-6 text-xs font-bold text-zinc-400 hover:text-red-500 transition-colors"
            >
              <AlertTriangle className="w-3 h-3" />
              Report an Issue
            </Link>
          </div>
        </div>
      </div>

      <ResourceTimeline resource={resource} bookings={bookings} />
    </div>
  );
}
