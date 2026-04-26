import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';


const ROUTE_TITLES = {
  '/dashboard':           'Overview',
  '/resources':           'Campus Resources',
  '/resources/:id':       'Resource Detail',
  '/bookings':            'Facility Bookings',
  '/bookings/new':        'New Booking',
  '/tickets':             'Maintenance & Support',
  '/tickets/new':         'New Ticket',
  '/admin/resources':     'Resource Management',
  '/admin/bookings':      'All Reservations',
  '/admin/tickets':       'Maintenance Queue',
  '/admin/users':         'User Management',
  '/technician/tickets':  'My Assigned Work',
};

export default function AppLayout() {
  const location = useLocation();

  // Match exact first, then try prefix for dynamic segments
  const currentTitle = ROUTE_TITLES[location.pathname] 
    || Object.entries(ROUTE_TITLES).find(([path]) => {
        const base = path.replace(/\/:[^/]+/g, '');
        return base !== path && location.pathname.startsWith(base + '/');
      })?.[1]
    || 'SmartCampus';

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 font-sans">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-0 lg:ml-60 transition-all duration-300">
        <TopBar title={currentTitle} />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>


    </div>
  );
}
