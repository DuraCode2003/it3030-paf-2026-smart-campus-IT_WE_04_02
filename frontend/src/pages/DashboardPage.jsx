import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { ROLES } from '../data';

// Dashboards
import StudentDashboard from './dashboard/StudentDashboard';
import LecturerDashboard from './dashboard/LecturerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';
import TechnicianDashboard from './dashboard/TechnicianDashboard';

export default function DashboardPage() {
  const { currentUser } = useAuth();

  if (currentUser.role === ROLES.STUDENT) {
    return <StudentDashboard />;
  }
  
  if (currentUser.role === ROLES.LECTURER) {
    return <LecturerDashboard />;
  }
  
  if (currentUser.role === ROLES.ADMIN) {
    return <AdminDashboard />;
  }
  
  if (currentUser.role === ROLES.TECHNICIAN) {
    return <TechnicianDashboard />;
  }

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
       <p className="text-zinc-500 font-medium">Please sign in to view your dashboard.</p>
    </div>
  );
}
