import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  AlertTriangle, 
  Upload, 
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import { RESOURCES } from '../data';
import { cn } from '../utils/cn';

export default function NewTicketPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    resourceId: '',
    location: '',
    category: 'OTHER',
    priority: 'MEDIUM',
    description: '',
  });
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Incident ticket created successfully!');
    navigate('/tickets');
  };

  const priorities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <PageHeader 
        title="Report an Incident" 
        subtitle="Found a fault? Provide details below and our team will look into it."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="card p-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select 
                label="Resource (Optional)" 
                placeholder="Select affected resource"
                value={formData.resourceId}
                onChange={(e) => setFormData(prev => ({ ...prev, resourceId: e.target.value }))}
                options={[
                  { value: '', label: 'No specific resource' },
                  ...RESOURCES.map(r => ({ value: r.id, label: r.name }))
                ]}
              />
              <Input 
                label="Exact Location" 
                placeholder="e.g. Block C, Floor 1, Near Room 102"
                required
                icon={MapPin}
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
           </div>

           <div className="space-y-3">
              <label className="text-sm font-black text-zinc-900 uppercase tracking-widest">Incident Priority</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                 {priorities.map(p => (
                   <button
                    key={p}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                    className={cn(
                      "px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-xl border-2 transition-all",
                      formData.priority === p 
                        ? p === 'CRITICAL' ? "bg-red-50 border-red-500 text-red-600 shadow-lg shadow-red-500/10" :
                          p === 'HIGH' ? "bg-orange-50 border-orange-500 text-orange-600 shadow-lg shadow-orange-500/10" :
                          p === 'MEDIUM' ? "bg-amber-50 border-amber-500 text-amber-600 shadow-lg shadow-amber-500/10" :
                          "bg-zinc-50 border-zinc-900 text-zinc-900"
                        : "bg-white border-zinc-100 text-zinc-400 hover:border-zinc-200"
                    )}
                   >
                     {p}
                   </button>
                 ))}
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select 
                label="Category" 
                required
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                options={[
                  { value: 'IT', label: 'IT (Network, Workstation)' },
                  { value: 'ELECTRICAL', label: 'Electrical (Lights, Power)' },
                  { value: 'PLUMBING', label: 'Plumbing (Leaks, Taps)' },
                  { value: 'HVAC', label: 'HVAC (Air Conditioning)' },
                  { value: 'OTHER', label: 'Other' },
                ]}
              />
           </div>

           <Textarea 
             label="Problem Description" 
             placeholder="Please describe the issue in detail..."
             required
             rows={6}
             value={formData.description}
             onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
           />

           <div className="space-y-3">
              <label className="text-sm font-black text-zinc-900 uppercase tracking-widest">Attachments (Max 3)</label>
              <div className="border-2 border-dashed border-zinc-100 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-zinc-50/30 hover:bg-zinc-50 hover:border-zinc-200 transition-all cursor-pointer group">
                 <div className="w-12 h-12 rounded-xl bg-white border border-zinc-100 flex items-center justify-center text-zinc-400 group-hover:text-brand-600 group-hover:border-brand-100 group-hover:shadow-lg transition-all">
                    <Upload className="w-6 h-6" />
                 </div>
                 <div className="text-center">
                    <p className="text-sm font-bold text-zinc-900">Drag images here or click to browse</p>
                    <p className="text-xs text-zinc-400 font-medium">JPEG or PNG only · Max 5MB per file</p>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-4">
           <Button 
            variant="secondary" 
            className="h-12 px-8 font-bold"
            onClick={() => navigate(-1)}
           >
             Cancel
           </Button>
           <Button 
            type="submit" 
            className="flex-1 h-12 justify-center text-base font-bold shadow-xl shadow-brand-500/20"
           >
             Submit Incident Report
           </Button>
        </div>
      </form>
    </div>
  );
}
