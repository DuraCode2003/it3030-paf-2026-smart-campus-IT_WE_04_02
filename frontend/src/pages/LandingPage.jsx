import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Monitor,
  Building2,
  Users,
  Zap,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFCF8] font-sans text-[#2D2D2D] selection:bg-[#FFB800] selection:text-white">
      
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Logo icon mimicking the four dots */}
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2.5 h-2.5 rounded-tl-full rounded-br-full bg-[#FF7043]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB800]" />
            <div className="w-2.5 h-2.5 rounded-tr-full rounded-bl-full bg-[#FF7043]" />
          </div>
          <span className="font-black text-xl tracking-tight">SMARTCAMPUS</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-[15px] font-bold text-zinc-600">
          <a href="#" className="hover:text-zinc-900 transition-colors">About</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Resources</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Bookings</a>
          <a href="#" className="hover:text-zinc-900 transition-colors">Support</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/login')}
            className="font-bold text-[15px] hover:text-[#5B58F5] transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-[#FFB800] hover:bg-[#F2AE00] text-white font-bold text-[15px] px-6 py-2.5 rounded-full shadow-lg shadow-[#FFB800]/30 transition-all hover:-translate-y-0.5"
          >
            Register
          </button>
        </div>
      </nav>

      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-8 pt-12 pb-24 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Content */}
        <div className="flex-1 space-y-8 z-10">
          <h1 className="text-[3.5rem] leading-[1.1] font-black tracking-tight text-[#2D2D2D] max-w-[600px]">
            Go beyond the limitations of campus operations.
          </h1>
          <p className="text-lg font-medium text-zinc-600">
            Empower collaborative facility management anytime, anywhere, together.
          </p>
          <div className="flex items-center gap-8 pt-2">
            <button 
              onClick={() => navigate('/login')}
              className="bg-[#4D4AED] hover:bg-[#3D3ADD] text-white font-bold px-8 py-3.5 rounded-2xl shadow-xl shadow-[#4D4AED]/20 transition-all hover:-translate-y-0.5"
            >
              Get Started
            </button>
            <button className="font-bold text-[#2D2D2D] border-b-2 border-zinc-300 hover:border-[#2D2D2D] pb-0.5 transition-colors">
              Explore resources
            </button>
          </div>
        </div>

        {/* Right Content / Image Composition */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end pr-8">
          {/* Main Orange Circle */}
          <div className="w-[450px] h-[450px] bg-[#FF7043] rounded-full relative shadow-2xl shadow-[#FF7043]/20">
            {/* Student Image */}
            <img 
              src="/images/hero-student.png" 
              alt="Student" 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] max-w-[500px] object-cover rounded-b-full scale-[1.15] origin-bottom z-10"
            />
            
            {/* Accents */}
            <div className="absolute top-12 -right-8 w-32 h-32 bg-[#FFB800] rounded-full -z-10" />
            <div className="absolute -bottom-6 -right-4 w-24 h-24 bg-[#4D4AED] rounded-full -z-10" />
            
            <div className="absolute top-1/4 -left-6">
              <Zap className="w-6 h-6 text-[#4D4AED] fill-[#4D4AED]" />
            </div>

            {/* Floating Card */}
            <div className="absolute bottom-16 -left-16 bg-white p-4 rounded-2xl shadow-xl shadow-black/5 z-20 flex flex-col gap-3 min-w-[200px]">
              <span className="text-sm font-bold text-zinc-600">Active Resources</span>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm z-30">
                  <Monitor className="w-5 h-5 text-blue-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white shadow-sm z-20">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center border-2 border-white shadow-sm z-10">
                  <Users className="w-5 h-5 text-amber-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#4D4AED] flex items-center justify-center border-2 border-white shadow-sm z-0 text-xs font-bold text-white">
                  50+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom Section ────────────────────────────────────────────────── */}
      <section className="bg-white py-24 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-8 space-y-12">
          
          <div className="text-center space-y-4">
            <p className="text-sm font-black text-[#FF7043] uppercase tracking-widest">
              Trending Campus Resources
            </p>
            <h2 className="text-4xl font-black text-[#2D2D2D]">
              Our Leading Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex items-center gap-5 hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-[#4D4AED] flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D2D2D] mb-1">Computing Labs</h3>
                <p className="text-sm font-medium text-zinc-500">12 Labs Available</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex items-center gap-5 hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-[#4D4AED] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D2D2D] mb-1">Lecture Halls</h3>
                <p className="text-sm font-medium text-zinc-500">8 Halls Available</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-zinc-100 rounded-3xl p-6 flex items-center gap-5 hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer">
              <div className="w-14 h-14 rounded-2xl bg-[#4D4AED] flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#2D2D2D] mb-1">Meeting Rooms</h3>
                <p className="text-sm font-medium text-zinc-500">24 Rooms Available</p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
