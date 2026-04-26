import React from 'react';
import { ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-red-50 flex items-center justify-center mb-6 shadow-xl shadow-red-500/10">
        <Lock className="w-10 h-10 text-red-500" />
      </div>
      <h1 className="text-3xl font-black text-zinc-900 mb-2 tracking-tight">Access Restricted</h1>
      <p className="text-zinc-500 max-w-xs mb-8 font-medium">
        You don't have the required permissions to view this page. Please contact an administrator if you believe this is an error.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          variant="secondary" 
          onClick={() => navigate(-1)} 
          icon={ArrowLeft}
        >
          Go Back
        </Button>
        <Button 
          onClick={() => navigate('/dashboard')}
        >
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default function RoleGuard({ allowedRoles, children, fallback }) {
  const { currentUser } = useAuth();

  if (!allowedRoles.includes(currentUser.role)) {
    return fallback || <UnauthorizedPage />;
  }

  return children;
}
