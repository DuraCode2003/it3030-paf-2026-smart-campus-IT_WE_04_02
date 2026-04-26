import React from 'react';
import { Zap, Mail, Lock, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export default function SignupPage() {
  const { login } = useAuth();

  const handleSignUp = (e) => {
    e.preventDefault();
    // In our app, everything routes through Google OAuth2
    login();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-900 items-center justify-center p-12 relative overflow-hidden">
        {/* Abstract Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-500/40 via-transparent to-transparent" />
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto shadow-2xl shadow-brand-500/40">
            <Zap className="w-8 h-8 text-white fill-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">SmartCampus</h1>
            <p className="text-zinc-400 text-lg font-medium">Join the next-generation campus operations hub.</p>
          </div>
          <div className="pt-8 grid grid-cols-2 gap-4 text-left">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-white font-bold text-xl mb-1">Instant</p>
              <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Access</p>
            </div>
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-white font-bold text-xl mb-1">Secure</p>
              <p className="text-zinc-500 text-xs uppercase font-bold tracking-widest">Platform</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="lg:hidden flex items-center gap-2 mb-8">
             <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white fill-white" />
             </div>
             <span className="font-bold text-xl tracking-tight">SmartCampus</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-black text-zinc-900 tracking-tight">Create an account</h2>
            <p className="text-zinc-500 font-medium">Sign up to access and manage campus facilities.</p>
          </div>

          <div className="space-y-4">
            <Button variant="secondary" onClick={login} className="w-full h-11 justify-center gap-3 font-bold border-zinc-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-100" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-zinc-400 font-bold tracking-widest">or</span>
              </div>
            </div>

            <form onSubmit={handleSignUp} className="space-y-4">
              <Input 
                label="Full name" 
                type="text" 
                placeholder="John Doe" 
                icon={UserIcon}
              />
              <Input 
                label="Email address" 
                type="email" 
                placeholder="name@sliit.lk" 
                icon={Mail}
              />
              <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                icon={Lock}
              />
              <Button type="submit" className="w-full h-11 justify-center font-bold text-base shadow-lg shadow-brand-500/20">
                Create account
              </Button>
            </form>
          </div>

          <p className="text-center text-sm text-zinc-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-zinc-400 font-medium pt-4">
            SLIIT Faculty of Computing · 2026
          </p>
        </div>
      </div>
    </div>
  );
}
