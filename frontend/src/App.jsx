import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

// Core providers & layout
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import AppLayout from './components/layout/AppLayout';
import RoleGuard from './components/guards/RoleGuard';
import { ROLES } from './data';

// Public pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

// App pages
import DashboardPage from './pages/DashboardPage';
import ResourcesPage from './pages/ResourcesPage';
import ResourceDetailPage from './pages/ResourceDetailPage';
import BookingsPage from './pages/BookingsPage';
import NewBookingPage from './pages/NewBookingPage';
import TicketsPage from './pages/TicketsPage';
import NewTicketPage from './pages/NewTicketPage';
import TicketDetailPage from './pages/TicketDetailPage';
import AdminResourcesPage from './pages/AdminResourcesPage';
import AdminUsersPage from './pages/AdminUsersPage';

// ─── Role groups ──────────────────────────────────────────────────────────────
const ALL_ROLES       = [ROLES.STUDENT, ROLES.LECTURER, ROLES.ADMIN, ROLES.TECHNICIAN];
const NON_TECHNICIAN  = [ROLES.STUDENT, ROLES.LECTURER, ROLES.ADMIN];
const ADMIN_ONLY      = [ROLES.ADMIN];
const TECH_ONLY       = [ROLES.TECHNICIAN];

// ─── Auth guard ───────────────────────────────────────────────────────────────
// Must be inside AuthProvider — so it reads the context.
// Redirects unauthenticated users to /login.
function AuthGuard({ children }) {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

// ─── Query client ─────────────────────────────────────────────────────────────
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* ── Public ─────────────────────────────────────────────────── */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* ── Protected (require auth + shared shell) ─────────────────  */}
            <Route
              element={
                <AuthGuard>
                  <AppLayout />
                </AuthGuard>
              }
            >
              {/* Dashboard — role-specific view rendered inside DashboardPage */}
              <Route path="/dashboard" element={<DashboardPage />} />

              {/* ── Resources ─────────────────────────────────────────────── */}
              <Route
                path="/resources"
                element={
                  <RoleGuard allowedRoles={NON_TECHNICIAN}>
                    <ResourcesPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/resources/:id"
                element={
                  <RoleGuard allowedRoles={NON_TECHNICIAN}>
                    <ResourceDetailPage />
                  </RoleGuard>
                }
              />

              {/* ── Bookings ──────────────────────────────────────────────── */}
              <Route
                path="/bookings"
                element={
                  <RoleGuard allowedRoles={NON_TECHNICIAN}>
                    <BookingsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/bookings/new"
                element={
                  <RoleGuard allowedRoles={NON_TECHNICIAN}>
                    <NewBookingPage />
                  </RoleGuard>
                }
              />

              {/* ── Tickets ───────────────────────────────────────────────── */}
              {/* Students / Lecturers / Admin: own list + detail */}
              <Route
                path="/tickets"
                element={
                  <RoleGuard allowedRoles={ALL_ROLES}>
                    <TicketsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/tickets/new"
                element={
                  <RoleGuard allowedRoles={NON_TECHNICIAN}>
                    <NewTicketPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/tickets/:id"
                element={
                  <RoleGuard allowedRoles={ALL_ROLES}>
                    <TicketDetailPage />
                  </RoleGuard>
                }
              />

              {/* ── Admin ─────────────────────────────────────────────────── */}
              <Route
                path="/admin/resources"
                element={
                  <RoleGuard allowedRoles={ADMIN_ONLY}>
                    <AdminResourcesPage />
                  </RoleGuard>
                }
              />
              {/* Admin bookings — reuses BookingsPage (which adapts to ADMIN role) */}
              <Route
                path="/admin/bookings"
                element={
                  <RoleGuard allowedRoles={ADMIN_ONLY}>
                    <BookingsPage />
                  </RoleGuard>
                }
              />
              {/* Admin tickets — reuses TicketsPage (which adapts to ADMIN role) */}
              <Route
                path="/admin/tickets"
                element={
                  <RoleGuard allowedRoles={ADMIN_ONLY}>
                    <TicketsPage />
                  </RoleGuard>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <RoleGuard allowedRoles={ADMIN_ONLY}>
                    <AdminUsersPage />
                  </RoleGuard>
                }
              />

              {/* ── Technician ────────────────────────────────────────────── */}
              {/* Technicians see their assigned tickets via /tickets (TicketsPage adapts) */}
              <Route
                path="/technician/tickets"
                element={
                  <RoleGuard allowedRoles={TECH_ONLY}>
                    <TicketsPage />
                  </RoleGuard>
                }
              />

              {/* ── Catch-all inside shell ────────────────────────────────── */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>

            {/* ── Catch-all outside shell ──────────────────────────────────  */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </BrowserRouter>

        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#18181b',
              color: '#f4f4f5',
              border: '1px solid #27272a',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '600',
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  );
}
