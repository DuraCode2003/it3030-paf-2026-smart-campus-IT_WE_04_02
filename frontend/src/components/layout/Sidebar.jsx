import React from 'react';
import { 
  Zap, 
  LayoutDashboard, 
  Building2, 
  CalendarCheck, 
  Ticket, 
  Settings2, 
  CalendarRange, 
  ClipboardList, 
  Users, 
  LogOut,
  Bell,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import { useAuth } from '../../hooks/useAuth';
import { usePermissions } from '../../hooks/usePermissions';
import { ROLES } from '../../data';

const NavItem = ({ to, icon: Icon, label, active, count }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all duration-150 group",
      active 
        ? "bg-zinc-800 text-white font-medium shadow-sm" 
        : "text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon className={cn("w-4 h-4 shrink-0", active ? "text-brand-400" : "text-zinc-500 group-hover:text-zinc-300")} />
      <span>{label}</span>
    </div>
    {count !== undefined && count > 0 && (
      <span className="px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-500 text-[10px] font-black border border-red-500/20">
        {count}
      </span>
    )}
  </Link>
);

const NavSection = ({ label, children }) => (
  <div className="space-y-1 mb-6">
    <p className="px-3 text-[10px] font-black tracking-widest text-zinc-500 uppercase mb-2">
      {label}
    </p>
    {children}
  </div>
);

export default function Sidebar() {
  const location = useLocation();
  const { currentUser } = useAuth();
  const { navItems } = usePermissions();
  const unreadNotifs = 3; // Mock value from STATS

  return (
    <aside className="w-60 h-full flex flex-col bg-zinc-900 border-r border-zinc-800 shrink-0">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <h2 className="font-black text-white leading-tight tracking-tight italic">SmartCampus</h2>
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none mt-1">Ops Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto custom-scrollbar pt-2">
        <NavSection label="Main">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" active={location.pathname === '/dashboard'} />
        </NavSection>

        {/* Role Specific Sections */}
        {currentUser.role === ROLES.TECHNICIAN ? (
          <NavSection label="My Work">
            <NavItem to="/technician/tickets" icon={Wrench} label="Assigned Tickets" active={location.pathname.startsWith('/technician/tickets')} />
          </NavSection>
        ) : (
          <>
            <NavSection label="Facilities">
              {navItems.resources && (
                <NavItem to="/resources" icon={Building2} label={currentUser.role === ROLES.ADMIN ? "Resources" : "Browse Resources"} active={location.pathname === '/resources'} />
              )}
              {navItems.allAvailability && (
                <NavItem to="/admin/bookings" icon={CalendarRange} label="All Availability" active={location.pathname === '/admin/bookings'} />
              )}
              {navItems.myBookings && (
                <NavItem to="/bookings" icon={CalendarCheck} label="My Bookings" active={location.pathname === '/bookings'} />
              )}
              {navItems.allBookings && (
                <NavItem to="/admin/bookings" icon={CalendarRange} label="All Bookings" active={location.pathname === '/admin/bookings'} />
              )}
            </NavSection>

            <NavSection label="Support">
              {navItems.myTickets && (
                <NavItem to="/tickets" icon={Ticket} label="My Tickets" active={location.pathname.startsWith('/tickets') && !location.pathname.startsWith('/admin')} />
              )}
              {navItems.allTickets && (
                <NavItem to="/admin/tickets" icon={ClipboardList} label="All Tickets" active={location.pathname === '/admin/tickets'} />
              )}
            </NavSection>
          </>
        )}

        {currentUser.role === ROLES.ADMIN && (
          <NavSection label="Management">
            <NavItem to="/admin/resources" icon={Settings2} label="Manage Resources" active={location.pathname === '/admin/resources'} />
            <NavItem to="/admin/users" icon={Users} label="Manage Users" active={location.pathname === '/admin/users'} />
          </NavSection>
        )}

        <NavSection label="Account">
          <NavItem to="/notifications" icon={Bell} label="Notifications" active={location.pathname === '/notifications'} count={unreadNotifs} />
        </NavSection>
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 bg-zinc-800/40 p-2.5 rounded-2xl border border-zinc-800/50 group hover:border-zinc-700 transition-colors">
          <Avatar name={currentUser.name} initials={currentUser.initials} size="md" className="ring-2 ring-zinc-800" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate leading-none mb-1.5">{currentUser.name}</p>
            <div className="flex items-center gap-1.5">
               <Badge status={currentUser.role} className={cn(
                 "text-[8px] font-black px-1.5 py-0 uppercase tracking-widest",
                 currentUser.role === ROLES.STUDENT ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                 currentUser.role === ROLES.LECTURER ? "bg-violet-500/10 text-violet-400 border-violet-500/20" :
                 currentUser.role === ROLES.ADMIN ? "bg-brand-500/10 text-brand-400 border-brand-500/20" :
                 "bg-teal-500/10 text-teal-400 border-teal-500/20"
               )} />
               <span className="text-[10px] text-zinc-500 font-medium truncate">{currentUser.department}</span>
            </div>
          </div>
          <button className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-700 rounded-lg transition-all group-hover:translate-x-0.5">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
