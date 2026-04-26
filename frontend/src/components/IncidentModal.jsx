import React from 'react';
import { X, AlertTriangle, MapPin, Upload, Info } from 'lucide-react';

export default function IncidentModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-card border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-lg">Report Maintenance Incident</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-secondary rounded-md transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <form className="p-4 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Category</label>
            <select className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none appearance-none">
              <option>IT (Network, Workstation)</option>
              <option>Electrical (Lights, Power)</option>
              <option>Plumbing (Leaks, Taps)</option>
              <option>HVAC (Air Conditioning)</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Room number or floor area..."
                className="w-full pl-10 pr-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Description</label>
            <textarea 
              rows={4}
              placeholder="Provide as much detail as possible about the issue..."
              className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:ring-1 focus:ring-primary outline-none resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-muted-foreground">Attachments</label>
            <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 cursor-pointer transition-colors">
               <Upload className="w-6 h-6 text-muted-foreground" />
               <p className="text-xs text-muted-foreground text-center">
                  <span className="font-bold text-primary">Click to upload</span> or drag and drop<br/>
                  JPEG or PNG (max 5MB)
               </p>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 h-10 border rounded-lg text-sm font-medium hover:bg-secondary transition-colors"
            >
              Discard
            </button>
            <button 
              type="submit"
              className="flex-1 h-10 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
