import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Check
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { RESOURCES, BOOKINGS } from '../data';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import { cn } from '../utils/cn';

export default function NewBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialResourceId = searchParams.get('resourceId');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resourceId: initialResourceId || '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    attendees: '',
  });

  const selectedResource = RESOURCES.find(r => r.id === formData.resourceId);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Booking request submitted successfully!');
    navigate('/bookings');
  };

  const steps = [
    { n: 1, label: 'Select Resource' },
    { n: 2, label: 'Date & Time' },
    { n: 3, label: 'Review' },
  ];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <PageHeader 
        title="New Booking Request" 
        subtitle="Reserve a facility for your academic or event needs."
      />

      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-100 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.n} className="relative z-10 flex flex-col items-center gap-2">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-4",
              step === s.n ? "bg-brand-600 border-brand-100 text-white shadow-lg" : 
              step > s.n ? "bg-emerald-500 border-emerald-50 text-white" : "bg-white border-zinc-50 text-zinc-400"
            )}>
              {step > s.n ? <Check className="w-5 h-5" /> : s.n}
            </div>
            <span className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              step === s.n ? "text-brand-600" : "text-zinc-400"
            )}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Step 1: Resource Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RESOURCES.filter(r => r.status === 'ACTIVE').map(r => (
                <div 
                  key={r.id}
                  onClick={() => setFormData(prev => ({ ...prev, resourceId: r.id }))}
                  className={cn(
                    "card p-4 flex items-center gap-4 cursor-pointer transition-all border-2",
                    formData.resourceId === r.id ? "border-brand-500 bg-brand-50/20" : "border-zinc-100 hover:border-zinc-300"
                  )}
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-zinc-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-zinc-900 truncate">{r.name}</p>
                    <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-tight">{r.type}</p>
                  </div>
                  {formData.resourceId === r.id && (
                    <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-4">
               <Button 
                onClick={handleNext} 
                disabled={!formData.resourceId}
                icon={ArrowRight}
                iconPosition="right"
               >
                 Continue to Schedule
               </Button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="card p-6 bg-zinc-50/50 flex items-center gap-4 border-dashed">
               <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-brand-500" />
               </div>
               <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Selected Resource</p>
                  <h4 className="text-lg font-bold text-zinc-900 leading-none">{selectedResource?.name}</h4>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Input 
                label="Pick a Date" 
                type="date" 
                icon={Calendar} 
                required
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
               />
               <Input 
                label="Number of Attendees" 
                type="number" 
                icon={Users} 
                placeholder="0"
                required
                value={formData.attendees}
                onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
               />
               <Input 
                label="Start Time" 
                type="time" 
                icon={Clock} 
                required
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
               />
               <Input 
                label="End Time" 
                type="time" 
                icon={Clock} 
                required
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
               />
            </div>

            <Textarea 
              label="Purpose of Booking" 
              placeholder="e.g. Project demonstration for IT3030 module"
              icon={FileText}
              required
              value={formData.purpose}
              onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            />

            <div className="flex items-center justify-between pt-4">
               <Button variant="secondary" onClick={handleBack} icon={ArrowLeft}>Back</Button>
               <Button 
                onClick={handleNext} 
                disabled={!formData.date || !formData.startTime || !formData.endTime || !formData.purpose}
                icon={ArrowRight}
                iconPosition="right"
               >
                 Review Summary
               </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div className="space-y-6">
             <div className="card divide-y divide-zinc-100 overflow-hidden">
                <div className="p-6 flex items-center gap-4 bg-brand-50/30">
                   <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-brand-600 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                   </div>
                   <div>
                      <h4 className="font-bold text-zinc-900">Review Request</h4>
                      <p className="text-xs text-zinc-500 font-medium">Please verify your reservation details below.</p>
                   </div>
                </div>
                
                <div className="p-6 space-y-6">
                   <div className="grid grid-cols-2 gap-y-6">
                      <div>
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Resource</p>
                         <p className="text-sm font-bold text-zinc-900">{selectedResource?.name}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Date</p>
                         <p className="text-sm font-bold text-zinc-900">{formData.date}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Time Range</p>
                         <p className="text-sm font-bold text-zinc-900">{formData.startTime} – {formData.endTime}</p>
                      </div>
                      <div>
                         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Attendees</p>
                         <p className="text-sm font-bold text-zinc-900">{formData.attendees} people</p>
                      </div>
                   </div>
                   
                   <div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Purpose</p>
                      <p className="text-sm font-medium text-zinc-700 italic leading-relaxed">"{formData.purpose}"</p>
                   </div>
                </div>
             </div>

             <div className="flex items-center justify-between pt-4">
                <Button variant="secondary" onClick={handleBack} icon={ArrowLeft}>Back</Button>
                <Button 
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 shadow-xl shadow-brand-500/20 px-8"
                >
                  Submit Booking Request
                </Button>
             </div>
          </div>
        )}
      </form>
    </div>
  );
}
